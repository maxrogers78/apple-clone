import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as THREE from 'three';
import { yellowImg } from '../utils';
import ModelView from './ModelView';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';
import { models, sizes } from '../constants';

const MODEL_INITIAL_STATE: Model = {
  title: 'iPhone 15 Pro in Natural Titanium',
  color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
  img: yellowImg,
};

const Model = () => {
  const [size, setSize] = useState<SizeValue>('small');
  const [model, setModel] = useState<Model>(MODEL_INITIAL_STATE);

  // camera control for the model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  useGSAP(() => {
    gsap.to('#heading', { opacity: 1, y: 0 });
  }, []);

  return (
    <section className='common-padding'>
      <div className='screen-max-width'>
        <h1 id='heading' className='section-heading'>
          Take a closer look
        </h1>

        <div className='mt-5 flex flex-col items-center'>
          <div className='relative h-[75vh] w-full overflow-hidden md:h-[90vh]'>
            <ModelView
              index={1}
              groupRef={small}
              gsapType='view1'
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />

            <ModelView
              index={2}
              groupRef={large}
              gsapType='view2'
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className='h-full w-full'
              style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}
              eventSource={document.getElementById('root') as HTMLElement}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className='mx-auto w-full'>
            <p className='mb-5 text-center text-sm font-light'>{model.title}</p>

            <div className='flex-center'>
              <ul className='color-container'>
                {models.map((item) => (
                  <li
                    key={item.id}
                    className='mx-2 h-6 w-6 cursor-pointer rounded-full'
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              <button type='button' className='size-btn-container'>
                {sizes.map((item) => (
                  <span
                    key={item.label}
                    className='size-btn'
                    style={{
                      backgroundColor:
                        size === item.value ? 'white' : 'transparent',
                      color: size === item.value ? 'black' : 'white',
                    }}
                    onClick={() => setSize(item.value)}
                  >
                    {item.label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
