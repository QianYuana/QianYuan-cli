import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Tag } from "antd";
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useAppStores } from "appStore";
import { Utils } from "untils";
import { KeepComponent, LazyComponent, DragTel, DragItem } from "components";
import { AliveScope, useAliveController } from "react-activation";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import "./index.scss";

const { Header, Sider, Content } = Layout;

const App: React.FC = observer(() => {
  const [collapsed, setCollapsed] = useState(false);
  const { appStores } = useAppStores();
  const { routeList, cacheList } = toJS(appStores);
  const location = useLocation();
  const navigate = useNavigate();
  const { refreshScope, clear } = useAliveController();
  const [key, setKey] = useState(Math.random());

  useEffect(() => {
    setKey(Math.random());
    console.log(location.pathname.split("/")[2]);

    if (location.pathname.split("/")[2]) {
      document.title = Utils.routeToNameMap(
        routeList,
        location.pathname.split("/")[2]
      );
      appStores.setCacheList(location.pathname.split("/")[2]);
    }
  }, [location]);

  /**
   * 关闭标签  删除缓存列表
   * @param e
   * @param item
   */
  const close = (e: React.MouseEvent<HTMLElement>, item: any) => {
    appStores.removeCacheList(item).then((res: unknown) => {
      const result = res as string; // 类型断言
      // 或者使用类型保护
      if (typeof result !== "string") {
        throw new Error("Expected a string");
      }
      // 处理字符串逻辑
      navigate(result);
    });
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {collapsed ? (
          <div
            className="logo"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src="/image/logo1.svg"
              alt="千源星"
              style={{ width: 32, height: 32 }}
            />
          </div>
        ) : (
          <div className="logo">
            <img
              src="/image/logo1.svg"
              alt="千源星"
              style={{ width: 32, height: 32, marginRight: 12 }}
            />
            <em>千源星</em>
          </div>
        )}
        <Menu
          theme="dark"
          mode="inline"
          key={key}
          defaultSelectedKeys={[location.pathname.split("/")[2]]}
          items={routeList.map((item) => ({
            key: item.path,
            icon: <item.icon />,
            label: item.name,
          }))}
          onClick={(e) => {
            navigate(e.key);
            appStores.setCacheList(e.key);
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, display: "flex", alignItems: "center" }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div style={{ display: "flex", alignItems: "center" }}>
            <DragTel
              list={cacheList.map((item) => {
                return { id: item, value: item };
              })}
              onChange={(items) => {
                let arr = items.map((item: { id: any }) => item.id);
                appStores.drgCacheList(arr);
              }}
            >
              {cacheList.map((item) => {
                return (
                  <DragItem id={item} key={item}>
                    <Tag
                      color={
                        item == location.pathname.split("/")[2]
                          ? "blue"
                          : "default"
                      }
                      key={item}
                      style={{ cursor: "pointer" }}
                      closable
                      onClose={(e) => {
                        e.preventDefault();
                        refreshScope(item);
                        close(e, item);
                      }}
                      onClick={() => {
                        navigate(item);
                      }}
                    >
                      {Utils.routeToNameMap(routeList, item)}
                    </Tag>
                  </DragItem>
                );
              })}
            </DragTel>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <AliveScope>
            <Routes>
              {routeList.map((item) => {
                return (
                  <Route
                    path={item.path}
                    element={<KeepComponent {...item} />}
                  ></Route>
                );
              })}
              <Route
                path="/"
                element={<Navigate replace to={routeList[0].path} />}
              ></Route>
            </Routes>
          </AliveScope>
        </Content>
      </Layout>
    </Layout>
  );
});

export default App;
