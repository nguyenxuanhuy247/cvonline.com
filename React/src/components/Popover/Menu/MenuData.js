import { SignOutIcon, AccountIcon, LanguageIcon} from '~/components/Image/Images.js';
import { BsArrowRight } from 'react-icons/bs';

export const MENU_AVATAR_DATA = [
    {
        id: 11,
        leftIcon: <AccountIcon />,
        title: 'Tài khoản',
        rightIcon: <BsArrowRight />,
        to: '/feedback',
    },
    {
        id: 12,
        leftIcon: <LanguageIcon />,
        title: 'Tiếng Việt',
        rightIcon: <BsArrowRight />,
        separate: true,
        children: {
            title: 'Ngôn ngữ',
            data: [
                {
                    id: 21,
                    type: 'Ngôn ngữ',
                    code: 'en',
                    title: 'English',
                },
                {
                    id: 22,
                    type: 'Ngôn ngữ',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        id: 13,
        leftIcon: <SignOutIcon />,
        title: 'Đăng xuất',
        rightIcon: <BsArrowRight />,
    },
];
