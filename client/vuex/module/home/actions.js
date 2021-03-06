/**
 * Created by jack on 16-8-16.
 */

import PostService from 'common/service/PostService';

import {createAction} from '../../common/actionHelper';
import {INIT_HOME_PAGE, QUERY_POSTS_LIST, RECEIVE_POSTS_LIST} from './mutation_types';
import image from 'assets/img/home-bg.jpg';

const initHomePage = ({commit}) => {
	commit(createAction(INIT_HOME_PAGE, {
		header: {
			image,
			title: 'D.D Blog',
			subtitle: 'Share More, Gain More.'
		}
	}));
};

const loadPostList = ({state, commit}) => {
	if (state.posts.isFinished) return;
	commit(QUERY_POSTS_LIST);
	const pager = {
		...state.posts.pager,
		number: state.posts.pager.number + 1
	};
	new PostService().queryPostList(pager)
		.then((result = {}) => {
			commit(createAction(RECEIVE_POSTS_LIST, {
				postsList: result.data.posts
			}));
		})
		.catch(console.error);
};

export default {initHomePage, loadPostList};
