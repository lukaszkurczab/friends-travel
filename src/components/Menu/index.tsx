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
    <div className="flex justify-between w-full items-center p-4 md:flex-col md:justify-between md:h-full">
      <div></div>
      <Button
        className="bg-neutral-0 hover:bg-neutral-300 ml-auto md:ml-0"
        onClick={handleLogout}
      >
        <p className="text-blue-500">Logout</p>
      </Button>
    </div>
  );
};

export default Menu;
