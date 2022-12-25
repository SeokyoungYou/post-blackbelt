# Post Black Belt 앱 소개

[구글 플레이스토어 출시 링크](https://play.google.com/store/apps/details?id=com.quartz_u.postblackbelt)

## 서비스 개발 배경 및 소개

> **주짓수 수련자**를 위한 모바일 수련 기록 일기장 앱입니다.

주짓수 수련자들은 대부분 주 3 회 이상의 많은 시간을 운동에 투자하지만, 다양한 기술이 존재하는 주짓수 특성상 모든 기술 수업 내용을 기억하기 쉽지 않습니다. 모든 수련자들이 갈망하는 블랙 벨트가 되기 위해서는 보통 10 년 정도의 긴 시간동안 꾸준히 운동해야 합니다. 본 서비스는 블랙 벨트가 되기 위해 꾸준히 수련하는 모든 수련자들에게 도움을 주기 위해 개발되었습니다.

본 서비스를 통해 주짓수 수련자들은 일지를 작성하고 두 가지 방법으로 일기를 체계적으로 확인할 수 있게 됩니다.

1. **날짜와 일기 카테고리**를 기준으로 **달력 형식** 일기 확인
2. **기술 카테고리**를 기준으로 분류된 **기술 트리 형식**의 일기 확인

모든 일기는 사용자의 디바이스에 저장되어 프라이빗하게 관리됩니다.

## 사용 기술

- FE: React Native, Expo
- Design tool: Figma

- Git | Format of the commit message: [AngularJS Git Commit Message Conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)

> [React Navtive 선정 계기](https://velog.io/@skyu_dev/Post-Black-Belt2-앱-만드는데-왜-프론트엔드-개발자를-뽑을까-Web-App-개발기)

## 프로젝트 폴더 구조

```
📦src
 ┣ 📂components         // React-native components
 ┃ ┣ 📂diary
 ┃ ┣ 📂forms
 ┃ ┃ ┣ 📂inputs
 ┃ ┣ 📂headers
 ┃ ┣ 📂pickers
 ┃ ┗ 📂user
 ┣ 📂constants
 ┣ 📂navigation         // Stack, Tab navigation components
 ┣ 📂screens            // Screen Components
 ┃ ┣ 📂home
 ┃ ┣ 📂myPage
 ┃ ┗ 📂techTree
 ┣ 📂utils
 ┃ ┣ 📂local-storage-fn // async-storage, sql-db functions
 ┃ ┣ 📂firebase-fn
 ┣ 📜App.js
 ┗ 📜theme.js
```

# 개발 시 고민한 내용들

### 1. 컴포넌트 재사용성

#### 1.1 ListPicker 컴포넌트의 재사용성 고려

- 컴포넌트 분리 목적: 데이터 처리 로직이 유사한 2 개의 `ListPicker` 컴포넌트의 재사용성을 고려. 변경에 더 유연하도록 리팩토링
- 데모 영상

![Dec-25-2022 22-24-10](https://user-images.githubusercontent.com/79842380/209470034-4362e1ed-5066-4bad-b275-f9a7a926cdb2.gif)

- 코드 구현 방법

![image](https://user-images.githubusercontent.com/79842380/209470073-bd89f1f2-8f57-49fc-b1c5-d357f4c7e8d0.png)

- 구현 코드

  1.  도메인 분리하기

      **`ListPicker`: 반복되는 디자인, 데이터 처리 담당**

      - 디자인의 반복: 카테고리를 리스트 형태로 나열 & 사용자의 선택 항목만 `updateActiveIconOpacity` 함수를 사용하여 opacity 높임
      - 데이터 처리의 반복: 사용자가 선택한 항목을 `dispatch` 함수를 사용하여 전역 상태 관리

  ```jsx
  export default function ListPicker({ items, dispatch, jsx }) {
    const opacityArr = Array(items.length).fill(ICON_OPACITY.INACTIVE);
    const [iconsOpacity, setIconOpacity] = useState(opacityArr);

    const updateActiveIconOpacity = (i) => {
      setIconOpacity(() => {
        const result = opacityArr;
        result[i] = ICON_OPACITY.ACTIVE;
        return result;
      });
    };

    const handleOnPress = (CAT, i) => {
      updateActiveIconOpacity(i);
      dispatch(CAT.ID);
    };
    return (
      <>
        {items.map((CAT, i) => {
          return (
            <Pressable
              key={CAT.ID}
              style={{ opacity: iconsOpacity[i] }}
              onPress={handleOnPress.bind(this, CAT, i)}
            >
              {jsx(CAT)}
            </Pressable>
          );
        })}
      </>
    );
  }
  ```

  2.  데이터 로직 주입하기
  3.  UI 로직 주입하기

      **`DiaryCatListPicker: `ListPicker` 컴포넌트에 데이터와 UI로직을 주입하여 구현`**

      - items: `ListPicker`에 주입될 데이터
      - dispatch: `ListPicker`의 데이터를 처리할 로직
      - jsx: `ListPicker`의 UI를 담당하는 리액트 컴포넌트(컴포넌트 합성)

  ```jsx
  export default function DiaryCatListPicker() {
    return (
      <View style={styles.container}>
        <ListPicker
          items={DIARY_CAT}
          dispatch={dispatchPressedCategory}
          jsx={DiaryJSX}
        />
      </View>
    );
  }

  const DiaryJSX = (CAT) => {
    return (
      <View style={styles.diaryCategory}>
        <Image style={styles.diaryCategoryImg} source={CAT.IMG_SRC} />
        <Text style={styles.diaryCategoryTitle}>{CAT.KOR}</Text>
      </View>
    );
  };
  ```

> [[React Design Pattern] 변경에 유연한 Picker Component 만들기](https://velog.io/@skyu_dev/React-Design-Pattern-변경에-유연한-Picker-Component-만들기)

#### 1.2 Forms & Inputs 컴포넌트의 재사용성 고려

### 2. 캘린더 UI

- 여러 캘린더 앱 비교하면서 리렌더링 발생 시기 비교

### 3. 사용자 피드백 반영

## 3.1 Input마다 정보를 저장 > 모든 사용자 정보를 한 번에 저장

![image](https://user-images.githubusercontent.com/79842380/209470102-bb99d3d9-48f5-46f7-bfcf-6e29a252d684.png)

# 화면(Screen)별 기능 목록

## Version 1

### [공통]

- 구현 데모

![Dec-21-2022 15-58-49](https://user-images.githubusercontent.com/79842380/208842623-f539bf47-b00c-495d-906d-132fc4190d3e.gif)

#### 1. 하단 네비게이션바

- 1.1 Home / My page / Tech tree 간 이동 ✅
- 1.2 페이지에 따라 아이콘 색깔 변경 ✅
- package: react-navigation

#### 2. 개발자 모드 ✅

- 전체 유저 데이터 삭제
- 전체 일기 삭제

#### 3. 상단 바 색상 변경 ✅ (iOS 불가)

### [Home(Diary Calendar)]

- 구현 데모

![Dec-21-2022 16-09-42](https://user-images.githubusercontent.com/79842380/208842778-34f40f4d-0db0-4988-813d-dd9724dffcd0.gif)

#### 1. 달력 형식 일기장

- package: react-native-calendars

- 1.1 날짜에 마킹하기 ✅
  - 1.1.1 오늘 날짜 ✅
  - 1.1.2 선택한 날짜 ✅
    - default: 오늘 날짜 ✅
  - 1.1.3 일기가 작성된 날짜: 일기 카테고리 아이콘 마킹 ✅
- 1.2 선택한 날짜의 일기를 간략하게 하단에 보여주기 ✅

#### 2. 사용자 정보 컴포넌트

- 2.1 사용자 정보 가져오기 ✅
- 2.2 이번 달 총 수련일 표시 ✅

### [Edit Diray]

- 구현 데모

![Dec-21-2022 16-10-11](https://user-images.githubusercontent.com/79842380/208842861-336fe781-7952-4476-8147-44a10f7addd2.gif)

#### 1. 일기 작성 및 저장 기능

- package: expo-sqlite

- 1.1 날짜 선택 & 플로팅 버튼 클릭 > 일기 작성창 이동 ✅
- 1.2 일기 작성창 구현 ✅
  - 1.2.1 일기 작성 날짜 가져오기 & 헤더 버튼 구현 ✅
  - 1.2.2 일기 카테고리 / 기술 카테고리 선정 창 ✅
  - 1.2.3 일기 제약 사항(500 자 이내) ✅
- 1.3 일기 로컬 저장소에 저장 ✅

#### 2. 일기 확인 & 수정 & 삭제 기능

- 2.1 일기 전체 내용 확인(Read) ✅
- 2.2 일기 수정 기능(Update) ✅
  - 로컬 저장소에 존재하는 일기 불러와서 수정
- 2.3 일기 삭제 기능(Delete) ✅

#### 3. 홈화면 재진입 시 초기화

- 3.1 선택한 날짜(1.1.2) 초기화 ✅
- 3.2 달력 페이지 이번 달로 초기화 ✅

### [My page]

- 구현 데모

![Dec-21-2022 16-11-16](https://user-images.githubusercontent.com/79842380/208842993-c1ef39ef-e930-463e-9590-f32689fcebb2.gif)

#### 1. 사용자 개인 정보 확인

- package: react-native-async-storage

- 1.1 사용자 이름, 소속, 사용자 목표: 올해 & 이 달 ✅
- 1.2 사용자 벨트 정보 ✅
- 1.3 사용자 주짓수 시작 날짜,최근 승급일 ✅

#### 2. 사용자 정보 수정 기능

- 1.1 사용자 이름, 소속, 사용자 목표: 올해 & 이 달 ✅
- 1.2 사용자 벨트 정보 ✅
  - package: react-native-picker
- 1.3 사용자 주짓수 시작 날짜,최근 승급일 ✅
  - package:react-native-community/datetimepicker

#### 3. 사용자 기술 분포도

- 3.1 기술 분포 파이 차트 ✅
  - package: react-native-chart-kit
- 3.2 저장된 일기 개수로 기술 분포 파악 ✅

### [Tech tree]

- 구현 데모

![Dec-21-2022 16-11-46](https://user-images.githubusercontent.com/79842380/208843071-a77e7962-2954-4301-9ea3-f70cb59ecced.gif)

- 1.1 상세 기술 선택 화면으로 이동 ✅
- 1.2 사용자 정보 가져오기: 사진 & 이름 ✅

### [Tech Detail]

- 1.1 관련 일기 출력 ✅
- 2.2 스크롤로 컨테이너로 일기 감싸기 ✅

## Version 1.1

### [Home]

- 로그인 여부 확인 > `Login` 리다이렉트 ✅

### [My page]

1. 설정창

   - 2.1 로그인 기능
     - 2.1.1 Firebase이메일/비밀번호 로그인(로그인, 로그아웃, 비밀번호 초기화) ✅
     - 2.1.2 사용자 정보 async-stroage에 저쟝 ✅
   - 2.2 데이터 동기화
     - 2.2.1 Firebase 서버로 sql-db 일기 데이터 전송/ 가져오기 ✅
     - 2.2.2 한 번 누르면 1 일동안 비활성화하기 ✅

2. 사용자 정보 화면 개선
   - 3.1 다수의 저장 버튼 > 1 개로 변경 ✅

## Version 1.2

### [Edit Diray]

1. 유튜브 등 링크 저장
   - 해당 앱/브라우저로 바로 이동
   - DiaryBrief에서 링크 있는 일기는 dot 표시

### [Tech tree]

1. 일기 확인 시 날짜로 필터링 및 정렬

### [My page]

1. 친구 추가

   - 사용자 정보 공유
   - 최근 3 개월 달력 공유
     - 오늘 일기 추가되면 firebase로 업데이트

## Version 2

### [공통]

- 언어 설정: 한/영 변환 기능 for 글로벌 출시

### [Home(Diary Calendar)]

1. 일기 카테고리에 따라 일기 분류하기
2. 일기: 당일 입은 도복 표시하기
3. 공유용 사진 내보내기 ex) 런데이

### [My page]

1. 사용자 개인 정보
   - 1.1 사용자 사진
   - 1.2 사용자 배경화면
   - 1.3 가지고 있는 도복 이름 & 색깔
2. 설정창

   - 2.1 한/영 설정
   - 2.2 일기 작성 알림 기능 (ex. 도장 근접 시/ 설정 시간마다 발생)

### [Tech tree]

1. 기술 분류 상세화 ex) 가드 > 스파이더 가드
2. 기술 분류 사용자 커스터마이징

### [Edit Diray]

1. 로컬 동영상, 사진 저장

## 기타 해야 할 일

1. 앱 시작 로고(splash) ✅
2. 구글 플레이스토어 출시 ✅
3. 애플 앱스토어 출시
   - DatePicker iOS에 맞는 UX 추가
