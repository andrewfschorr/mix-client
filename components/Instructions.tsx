import React, { useState, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';

import styles from './styles/EditableInstructions.module.css';

const Instructions = ({ drinkReducer, instructionList }) => {
  const instructs = instructionList.map((instruction, i) => {
    const ref = React.createRef<HTMLParagraphElement>();
    const isLastItem = i !== instructionList.length - 1;

    return (
      <li className="list-disc py-2" key={i}>
        <div className="flex">
          <ContentEditable
            innerRef={ref}
            style={{ minWidth: 100, marginRight: 10 }}
            className={`${styles.instructionField} border-b border-transparent hover:border-gray-400`}
            html={instruction}
            disabled={false}
            onChange={(e) => {
              instructionList[i] = ref.current.textContent;
              drinkReducer({
                type: 'instructions',
                data: [...instructionList],
              });
            }}
            tagName="p"
          />

          <div className="flex items-center">
            {isLastItem && instructionList[i + 1] !== '' ? (
              <svg
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  const tmp = instructionList[i + 1];
                  instructionList[i + 1] = instructionList[i];
                  instructionList[i] = tmp;
                  drinkReducer({
                    type: 'instructions',
                    data: [...instructionList],
                  });
                }}
                className="bi bi-arrow-down-short"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 7.646a.5.5 0 01.708 0L8 10.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M8 4.5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z"
                  clipRule="evenodd"
                />
              </svg>
            ) : null}

            {isLastItem && i !== 0 ? (
              <svg
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (i === 0) return;
                  const tmp = instructionList[i - 1];
                  instructionList[i - 1] = instructionList[i];
                  instructionList[i] = tmp;
                  drinkReducer({
                    type: 'instructions',
                    data: [...instructionList],
                  });
                }}
                className="bi bi-arrow-up-short"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 5.5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V6a.5.5 0 01.5-.5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M7.646 4.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8 5.707 5.354 8.354a.5.5 0 11-.708-.708l3-3z"
                  clipRule="evenodd"
                />
              </svg>
            ) : null}

            {isLastItem ? (
              <svg
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  instructionList.splice(i, 1);
                  drinkReducer({
                    type: 'instructions',
                    data: [...instructionList],
                  });
                }}
                className="bi bi-trash-fill"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z"
                  clipRule="evenodd"
                />
              </svg>
            ) : null}
          </div>
        </div>
      </li>
    );
  });

  return <ul>{instructs}</ul>;
};

export default Instructions;
