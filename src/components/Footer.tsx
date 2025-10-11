import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Footer() {
  return (
    <footer className="flex-1 flex flex-row bg-header text-xs justify-between items-center opacity-50 p-2 gap-2 border-t-disabled border-t-2">
      <span>{__APP_VERSION__}</span>
      <a
        href="https://github.com/Mr-Fougere/YoutubeBlue"
        target="_blank"
        className="flex flex-row  gap-1 items-center"
      >
        <span>Made by Mr-Fougere</span>
        <FontAwesomeIcon icon={faGithub} className="size-4" />
      </a>
    </footer>
  );
}
