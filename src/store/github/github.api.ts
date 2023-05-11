import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRepo, IUser, ServerResponse } from '../../models/models';

export const githubApi = createApi({
	reducerPath: 'github/api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.github.com/',
	}),
	// refetchOnFocus: true,
	endpoints: (build) => ({
		searchUsers: build.query<IUser[], string>({
			query: (search: string) => ({
				url: `search/users`,
				params: {
					q: search,
					per_page: 10,
				},
			}),
			transformResponse: (response: ServerResponse<IUser>) =>
				response.items,
		}),

		getUserRepos: build.query<IRepo[], { username: string; page: number }>({
			query: ({ username, page }) => ({
				url: `users/${username}/repos`,
				params: {
					per_page: 15,
					page,
				},
			}),
		}),
		getUserReposCount: build.query<{ count: number }, string>({
			query: (username: string) => ({
				url: `users/${username}`,
			}),
			transformResponse: (response: ServerResponse<IUser>) => ({
				count: response.public_repos,
			}),
		}),
		// boilerplate for mutation db
		// createUser: build.mutation<any, void>({
		//     query: () => ''
		// }),
	}),
	tagTypes: ['no-auto-dispatch'],
});

export const {
	useSearchUsersQuery,
	useLazyGetUserReposQuery,
	useLazyGetUserReposCountQuery,
} = githubApi;
