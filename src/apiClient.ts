import {User} from './features/userlist/userListSlice';

type ResponseKind = 'success' | 'failure';

interface NetworkResponse<T> {
  kind: ResponseKind;
  body?: T;
}

export const fetchUsers = async (
  page: Number,
  count: Number,
): Promise<NetworkResponse<User[]>> => {
  const response = await fetch(
    `https://randomuser.me/api/?results=${count}&page=${page}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  );
  if (response.ok) {
    const json = await response.json();
    return {
      kind: 'success',
      body: json.results,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};
