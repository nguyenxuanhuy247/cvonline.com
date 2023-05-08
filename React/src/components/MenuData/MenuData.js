import { SignOutIcon, AccountIcon, LanguageIcon, HelpIcon } from '~/components/Image/Images.js';
import { BsArrowRight } from 'react-icons/bs';
import { RxMagnifyingGlass } from 'react-icons/rx';

export const HEADER_NAVBAR_DATA = [
    {
        id: 11,
        name: 'Tìm việc',
        route: '/',
        children: [
            {
                id: 21,
                leftIcon: <RxMagnifyingGlass />,
                name: 'Tìm việc làm',
                rightIcon: <BsArrowRight />,
            },
            {
                id: 22,
                leftIcon: <RxMagnifyingGlass />,
                name: 'Việc làm đã ứng tuyển',
                rightIcon: <BsArrowRight />,
            },
            {
                id: 23,
                leftIcon: <AccountIcon />,
                name: 'Việc làm đã lưu',
                rightIcon: <BsArrowRight />,
            },
            {
                id: 24,
                leftIcon: <AccountIcon />,
                name: 'Việc làm phù hợp',
                rightIcon: <BsArrowRight />,
            },
            {
                id: 25,
                name: 'Việc làm senior',
                rightIcon: <BsArrowRight />,
            },
        ],
    },
    {
        id: 12,
        name: 'Hồ sơ & CV',
        route: '/personal',
        children: [
            {
                id: 21,
                leftIcon: <AccountIcon />,
                name: 'sub menu 1',
                rightIcon: <BsArrowRight />,
            },
            {
                id: 22,
                leftIcon: <AccountIcon />,
                name: 'sub menu 2',
                rightIcon: <BsArrowRight />,
            },
            {
                id: 23,
                leftIcon: <AccountIcon />,
                name: 'sub menu 3',
                rightIcon: <BsArrowRight />,
            },
            {
                id: 24,
                leftIcon: <AccountIcon />,
                name: 'sub menu 4',
                rightIcon: <BsArrowRight />,
            },
        ],
    },
    {
        id: 13,
        name: 'Công ty',
        route: '/',
        children: [
            {
                id: 21,
                leftIcon: <AccountIcon />,
                name: 'sub menu 1',
                rightIcon: <BsArrowRight />,
            },
            {
                id: 22,
                leftIcon: <AccountIcon />,
                name: 'sub menu 2',
                rightIcon: <BsArrowRight />,
            },
            {
                id: 23,
                leftIcon: <AccountIcon />,
                name: 'sub menu 3',
                rightIcon: <BsArrowRight />,
            },
            {
                id: 24,
                leftIcon: <AccountIcon />,
                name: 'sub menu 4',
                rightIcon: <BsArrowRight />,
            },
        ],
    },
    {
        id: 14,
        name: 'Phát triển sự nghiệp',
        route: '/',
        children: [
            {
                id: 21,
                leftIcon: <AccountIcon />,
                name: 'sub menu 1',
                rightIcon: <BsArrowRight />,
            },
            {
                id: 22,
                leftIcon: <AccountIcon />,
                name: 'sub menu 2',
                rightIcon: <BsArrowRight />,
            },
            {
                id: 23,
                leftIcon: <AccountIcon />,
                name: 'sub menu 3',
                rightIcon: <BsArrowRight />,
            },
            {
                id: 24,
                leftIcon: <AccountIcon />,
                name: 'sub menu 4',
                rightIcon: <BsArrowRight />,
            },
        ],
    },
    {
        id: 15,
        name: 'Công cụ',
        route: '/',
        children: [
            {
                id: 21,
                leftIcon: <AccountIcon />,
                name: 'sub menu 1',
                rightIcon: <BsArrowRight />,
            },
            {
                id: 22,
                leftIcon: <AccountIcon />,
                name: 'sub menu 2',
                rightIcon: <BsArrowRight />,
            },
            {
                id: 23,
                leftIcon: <AccountIcon />,
                name: 'sub menu 3',
                rightIcon: <BsArrowRight />,
            },
            {
                id: 24,
                leftIcon: <AccountIcon />,
                name: 'sub menu 4',
                rightIcon: <BsArrowRight />,
            },
        ],
    },
];


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
        leftIcon: <HelpIcon />,
        title: 'Trợ giúp',
        rightIcon: <BsArrowRight />,
    },
    {
        id: 14,
        leftIcon: <SignOutIcon />,
        title: 'Đăng xuất',
        rightIcon: <BsArrowRight />,
    },
];
