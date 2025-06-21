import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { Button } from "../Button";

const Menu = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between p-4 h-full">
      <div></div>
      <Button
        className="bg-neutral-0 hover:bg-neutral-300"
        onClick={handleLogout}
      >
        <p className="text-blue-500">Logout</p>
      </Button>
    </div>
  );
};

export default Menu;
