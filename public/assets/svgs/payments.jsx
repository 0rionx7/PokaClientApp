const card = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    fill="none"
    viewBox="0 0 48 48"
    key="card">
    <path
      fill="#0D101A"
      fillRule="evenodd"
      d="M7.5 15h33v4h-33v-4zM9 24.5a1.5 1.5 0 011.5-1.5h9a1.5 1.5 0 010 3h-9A1.5 1.5 0 019 24.5zM9 31.5a1.5 1.5 0 011.5-1.5h6a1.5 1.5 0 010 3h-6A1.5 1.5 0 019 31.5zM34 31.5a1.5 1.5 0 011.5-1.5h2a1.5 1.5 0 010 3h-2a1.5 1.5 0 01-1.5-1.5z"
      clipRule="evenodd"></path>
    <rect
      width="34.5"
      height="22.5"
      x="6.75"
      y="12.75"
      stroke="#0D101A"
      strokeWidth="1.5"
      rx="2.25"></rect>
  </svg>
);
const dias = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="49"
    fill="none"
    viewBox="0 0 48 49"
    key="dias">
    <path
      stroke="#0D101A"
      strokeWidth="2"
      d="M8 17.9l16-7 16 7M13.5 19.9v14M20.5 19.9v14M27.5 19.9v14M34.5 19.9v14M9 37.9h30"></path>
  </svg>
);
const vivaWallet = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="50"
    height="37"
    fill="bisque"
    viewBox="0 0 50 37"
    key="viva">
    <path fill="url(#pattern0)" d="M0 0H50V37H0z"></path>
    <defs>
      <pattern
        id="pattern0"
        width="1"
        height="1"
        patternContentUnits="objectBoundingBox">
        <use
          transform="matrix(.00387 0 0 .00523 .2 .197)"
          xlinkHref="#image0_1843_7219"></use>
      </pattern>
      <image
        id="image0_1843_7219"
        width="155"
        height="116"
        xlinkHref="data:image/png;base64,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"></image>
    </defs>
  </svg>
);

export const paymentsIcons = [card, dias, vivaWallet];
