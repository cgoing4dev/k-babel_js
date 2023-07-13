import { writable } from 'svelte/store';

export const postMode = writable(0);
export const drawerHidden = writable(true);
export const avatarSrcStore = writable('');

// member 아바타 (예를 들어, 제3의 유저가 /@hjchoi870406 로 접속하면 hjchoi870406의 아바타를 볼 수 있어야지)
export const memberAvatarSrc = writable('');
