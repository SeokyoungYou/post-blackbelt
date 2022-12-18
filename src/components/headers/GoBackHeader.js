import Header from "./Header";

export default function GoBackHeader({ navigation, title }) {
  const headerInfo = {
    left: {
      icon: "chevron-left",
      iconColor: "black",
      onPress: () => navigation.goBack(),
    },
    title: `${title}`,
    right: {
      icon: "check",
      iconColor: "white",
      onPress: () => {},
    },
  };

  return <Header headerInfo={headerInfo} />;
}
