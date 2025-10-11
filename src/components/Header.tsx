import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Header() {
  return (
    <header className="flex flex-row justify-between items-center text-sm bg-header p-2 border-b-disabled border-b-2">
      <div className="flex flex-row justify-center items-center gap-1">
        <FontAwesomeIcon icon={faYoutube} className="text-main-blue size-7" />
        <span className="flex font-bold">
          YouTube<span className="text-main-blue text-xs">BLUE</span>
        </span>
      </div>
    </header>
  );
}
