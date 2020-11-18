import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { App } from './App';

const imageAdress =
  'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340';
const text = `T h e G i f t o f t h e M a g i
ONE DOLLAR AND EIGHTY-SEVEN CENTS.
That was all. She had put it aside, one cent and then another and then
another, in her careful buying of meat and other food. Della counted
it three times. One dollar and eighty-seven cents. And the next day
would be Christmas.
There was nothing to do but fall on the bed and cry. So Della did it.
While the lady of the home is slowly growing quieter, we can
look at the home. Furnished rooms at a cost of $8 a week. There is little more to say about it.
In the hall below was a letter-box too small to hold a letter. There
was an electric bell, but it could not make a sound. Also there was a
name beside the door: “Mr. James Dillingham Young.”`;
const secondImg =
  'https://images.assetsdelivery.com/compings_v2/biletskiy/biletskiy1506/biletskiy150600086.jpg';
const thirdImg =
  'https://expertphotography.com/wp-content/uploads/2011/06/how-to-take-good-pictures-waterlilly.jpg';
const video = 'https://youtu.be/P3cffdsEXXw';

const content = [
  <div>{text}</div>,
  <img style={{ width: '100%' }} src={imageAdress} alt="A Mysterious girl" />,
  <img style={{ width: '100%' }} src={secondImg} alt="Beautiful field" />,
  <img style={{ width: '100%' }} src={thirdImg} alt="a flower" />,
  <iframe
    style={{ position: 'relative', zIndex: 99999}}
    width="560"
    height="315"
    src="https://www.youtube.com/embed/P3cffdsEXXw"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>,
];

ReactDOM.render(<App content={content} />, document.getElementById('root'));
