import React from 'react';

export default [
  {
    label: 'B',
    style: 'BOLD',
    icon: 'bold',
    description: 'Bold',
  },
  {
    label: 'I',
    style: 'ITALIC',
    icon: 'italic',
    description: 'Italic',
  },
  {
    label: 'U',
    style: 'UNDERLINE',
    icon: 'underline',
    description: 'Underline',
  },
  {
    label: 'S',
    style: 'STRIKETHROUGH',
    icon: 'strikethrough',
    description: 'Strikethrough',
  },
  {
    label: (
      <svg width="20" height="15" viewBox="0 0 14 14">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-468.000000, -254.000000)" stroke="#FFFFFF">
            <g transform="translate(260.000000, 165.000000)">
              <g transform="translate(0.000000, 75.000000)">
                <g transform="translate(19.000000, 0.000000)">
                  <g transform="translate(196.424621, 21.424621) rotate(45.000000) translate(-196.424621, -21.424621) translate(193.424621, 13.924621)">
                    <path d="M0.5,5.69098301 L0.5,2 C0.5,1.82069363 0.550664909,1.51670417 0.697213595,1.2236068 C0.927818928,0.762396132 1.32141313,0.5 2,0.5 L4,0.5 C4.67858687,0.5 5.07218107,0.762396132 5.3027864,1.2236068 C5.44933509,1.51670417 5.5,1.82069363 5.5,2 L5.5,6 C5.5,6.67858687 5.23760387,7.07218107 4.7763932,7.3027864 C4.53586606,7.42304998 4.28800365,7.47874077 4.1077327,7.49484936 L0.5,5.69098301 Z" />
                    <path
                      d="M0.5,12.690983 L0.5,9 C0.5,8.82069363 0.550664909,8.51670417 0.697213595,8.2236068 C0.927818928,7.76239613 1.32141313,7.5 2,7.5 L4,7.5 C4.67858687,7.5 5.07218107,7.76239613 5.3027864,8.2236068 C5.44933509,8.51670417 5.5,8.82069363 5.5,9 L5.5,13 C5.5,13.6785869 5.23760387,14.0721811 4.7763932,14.3027864 C4.53586606,14.42305 4.28800365,14.4787408 4.1077327,14.4948494 L0.5,12.690983 Z"
                      transform="translate(3.000000, 11.000000) scale(-1, -1) translate(-3.000000, -11.000000) "
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    ),
    style: 'hyperlink',
    icon: 'link',
    description: 'Add a link',
  },
];
