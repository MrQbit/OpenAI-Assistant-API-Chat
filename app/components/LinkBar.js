import { VercelIcon } from "../icons";

const LinkBar = () => (
  <div className="absolute top-5 hidden w-full justify-between px-5 sm:flex">
    <a
      href="/deploy"
      target="_blank"
      className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto"
    >
      <VercelIcon />
    </a>

  </div>
);

export default LinkBar;
