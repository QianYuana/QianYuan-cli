import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useAppStores } from "appStore";

import { toJS } from "mobx";
import "./index.scss";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { appStores } = useAppStores();
  const { routeList } = toJS(appStores);
  const location = useLocation();
  const navigate = useNavigate();

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
          defaultSelectedKeys={[location.pathname.split("/")[2]]}
          items={routeList.map((item) => ({
            key: item.path,
            icon: <item.icon />,
            label: item.name,
          }))}
          onClick={(e) => {
            navigate(e.key);
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Suspense fallback={<div>拼命加载中...</div>}>
            <Routes>
              {routeList.map((item) => {
                const LazyComponent = lazy(item.element);
                return (
                  <Route path={item.path} element={<LazyComponent />}></Route>
                );
              })}
              <Route
                path="/"
                element={<Navigate replace to={routeList[0].path} />}
              ></Route>
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
