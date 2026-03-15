import "./Friend.css";
import Header from "../../common/components/Header/Header";
import Footer from "../../common/components/Footer/Footer";
import AddFriend from "./components/AddFriend";
import PickupFriend from "./components/PickupFriend.tsx";

const Friend = () => {
  return (
    <>
      <Header />
      <main>
        <AddFriend />
        <PickupFriend />
      </main>
      <Footer active="friend" />
    </>
  );
};

export default Friend;
