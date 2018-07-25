/** Created by YangXiaozhe on 2018/7/25 */
import React from 'react'
import {Drawer, Icon, List} from 'antd';

export default class Header extends React.PureComponent {
    state = {visible: false};

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    handleItemClick = (index) => () => this.props.changeAlbum(index);

    render() {
        const {currentAlbumIndex, albumList} = this.props;

        const drawerAlbumList = <List
            itemLayout="horizontal"
            dataSource={albumList}
            renderItem={(item, index) => (
                <span onClick={this.handleItemClick(index)}>
                <List.Item>
                    <List.Item.Meta
                        title={index === currentAlbumIndex ? <strong><Icon type="play-circle-o"/> {item.name}</strong>:item.name}
                        description={index === currentAlbumIndex ? <strong>{item.desc}</strong> : item.desc}
                    />
                </List.Item>
                </span>
            )}
        />;

        const drawer = <Drawer
            title="选择专辑"
            placement="right"
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
        >{drawerAlbumList}</Drawer>;

        return <div>
            <span>{albumList[currentAlbumIndex].name}</span>
            <Icon style={{float: 'right'}} type="bars" onClick={this.showDrawer}/>
            {drawer}
        </div>
    }
}