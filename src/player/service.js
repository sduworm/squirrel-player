/** Created by YangXiaozhe on 2018/7/26 */
import request from '../utils/request';

export async function queryAlbumList() {
    return request('data/albumList.json');
}