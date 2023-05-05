import Github from '~/assets/icons/github.png';
import Gitlab from '~/assets/icons/gitlab.png';
import HTML from '~/assets/icons/HTML.png';
import CSS from '~/assets/icons/CSS.png';

import findJob from '~/assets/img/find-job.png';
import makeCV from '~/assets/img/make-cv.png';
import secSafe from '~/assets/img/sec-safe.png';

import avatar from '~/assets/img/avatar.jpg';
export const Icons = {
    Github,
    Gitlab,
    HTML,
    CSS,
};

export const PngImages = { findJob, makeCV, secSafe };

export const JpgImages = { avatar };

export const AccountIcon = () => {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
            <path d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
        </svg>
    );
};

export const LanguageIcon = () => {
    return (
        <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em">
            <path d="M478.33 433.6l-90-218a22 22 0 00-40.67 0l-90 218a22 22 0 1040.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 00458 464a22 22 0 0020.32-30.4zM334.83 362L368 281.65 401.17 362zM267.84 342.92a22 22 0 00-4.89-30.7c-.2-.15-15-11.13-36.49-34.73 39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 000-44H214V70a22 22 0 00-44 0v20H54a22 22 0 000 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 00-40.58 17c.58 1.38 14.55 34.23 52.86 83.93.92 1.19 1.83 2.35 2.74 3.51-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1021.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59 22.52 24.08 38 35.44 38.93 36.1a22 22 0 0030.75-4.9z" />
        </svg>
    );
};

export const HelpIcon = () => {
    return (
        <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em">
            <path
                fill="none"
                stroke="currentColor"
                strokeMiterlimit={10}
                strokeWidth={32}
                d="M256 80a176 176 0 10176 176A176 176 0 00256 80z"
            />
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit={10}
                strokeWidth={28}
                d="M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45 10 4.76 29.47 16.38 29.47 41.09 0 26-17 37.81-36.37 50.8S251 281.43 251 296"
            />
            <path d="M270 348 A20 20 0 0 1 250 368 A20 20 0 0 1 230 348 A20 20 0 0 1 270 348 z" />
        </svg>
    );
};

export const SignOutIcon = () => {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
            <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z" />
        </svg>
    );
};
