import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface IAppProps {}

const ThreeModal: React.FunctionComponent<IAppProps> = (props) => {
  const webGLRef = useRef<any>();
  const webGLInit = () => {
    // 三维场景
    const scene = new THREE.Scene();
    // 模型对象
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshPhysicalMaterial({
      color: "#049ef4",
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    // AxesHelper：辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(250);
    scene.add(axesHelper);
    //光源
    const pointLight = new THREE.PointLight(0xffffff, 2.0);
    pointLight.decay = 2.0; //设置光源不随距离衰减
    pointLight.intensity = 10.0; //光照强度
    pointLight.position.set(5000, 300, 100); //点光源放在x轴上
    scene.add(pointLight);

    // 相机
    const width = document.getElementById("tree-canvas")?.clientWidth || 800; //宽度
    const height = document.getElementById("tree-canvas")?.clientHeight || 600; //高度
    // 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
    const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
    camera.position.set(292, 223, 185); // 相机位置xyz坐标：200, 200, 200
    camera.lookAt(0, 0, 0); //相机观察目标指向Threejs 3D空间中某个位置

    // WebGL渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.render(scene, camera);
    //three.js执行渲染命令会输出一个canvas画布(HTML元素)，你可以插入到web页面中
    // document.body.appendChild(renderer.domElement);
    webGLRef.current.appendChild(renderer.domElement);

    // 设置相机控件轨道控制器OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
    controls.addEventListener("change", function () {
      renderer.render(scene, camera); //执行渲染操作
    }); //监听鼠标、键盘事件

    //可视化点光源辅助对象
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 2);
    scene.add(pointLightHelper);

    //环境光:没有特定方向，整体改变场景的光照明暗
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);
    // 渲染函数
    function render() {
      renderer.render(scene, camera); //执行渲染操作
      mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
      requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
    }
    render();
  };

  useEffect(() => {
    console.log(11111);

    webGLInit();
  }, []);

  return <div id="webgl" ref={webGLRef}></div>;
};

export default ThreeModal;
