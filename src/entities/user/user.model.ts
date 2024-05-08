import { nanoid } from 'nanoid';

export type UserModel = {
    id: string;
    username: string;
    /** 예제용 이기 때문에 password 속성을 포함하고있음. 실제로는 password를 제외해야 함. */
    password: string;
    nickname: string;
    createdAt: Date;
}

export const mockUserList: UserModel[] = [
    {
        id: nanoid(),
        username: 'test01',
        password: '123123',
        nickname: '테스터01',
        createdAt: new Date()
    },
    {
        id: nanoid(),
        username: 'test02',
        password: '1q2w3e!@',
        nickname: '테스터02',
        createdAt: new Date()
    }
];