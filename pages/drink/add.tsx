import { useReducer, useState, useEffect } from 'react';
import makeRequest from 'utils/makeRequest';
import Skeleton from 'common/Skeleton';
import AppContext from 'utils/AppContext';
import cookies from 'next-cookies';
import getAuthedUserFromJwt from 'utils/getAuthedUserFromJwt';
import IngredientList from 'components/IngredientList';
import { AppContextInterface } from 'models/types';
import { COOKIE_NAME } from 'utils/appConstants';
import { Drink } from 'models/types';
import { turnAuthCookieIntoHeader } from 'utils/requestHelpers';
import Instructions from 'components/Instructions';
import ImageUploading from 'react-images-uploading';
import Async from 'react-select/async';

const reducer = (state, action): Drink => {
  if (action.type === 'name' || action.type === 'description') {
    return {
      ...state,
      [action.type]: action.data,
    };
  } else if (action.type === 'ingredients') {
    return {
      ...state,
      ingredients: [...action.data],
    };
  } else if (action.type === 'instructions') {
    return {
      ...state,
      instructions: [...action.data],
    };
  } else if (action.type === 'image') {
    return {
      ...state,
      image: action.image,
    }
  } else if (action.type === 'tags') {
    return {
      ...state,
      tags: [...action.data],
    }
  }
  return state;
};

const getTags = () => {
  return new Promise((resolve) => {
    makeRequest('/tags').then(resp => resp.json()).then(tagResponse => {
      resolve(tagResponse.map(tag => ({
        value: tag.id,
        label: tag.name,
      })));
    });
  });
}

const tagPromise = getTags();

const loadOptions = (inputVal) => {
  return new Promise((resolve) => {
    tagPromise.then((tags: Array<any>) => {
      resolve(tags.filter(tag => tag.label.toLowerCase().includes(inputVal)));
    });
  });
}

function Index({ pathname, userInfo, cookie }) {
  const [drinkToAdd, drinkReducer] = useReducer(reducer, {
    name: '',
    description: '',
    ingredients: [],
    instructions: [],
    tags: [],
    image: null,
  });

  useEffect(() => {
    if (
      drinkToAdd.instructions.length === 0 ||
      drinkToAdd.instructions[drinkToAdd.instructions.length - 1] !== ''
    ) {
      drinkReducer({
        type: 'instructions',
        data: [...drinkToAdd.instructions, ''],
      });
    }
  }, [drinkToAdd]);

  // errors
  const [nameSubmissionError, setNameSubmissionError] = useState<boolean>(
    false
  );
  const [descriptionSubmissionError, setDescriptionSubmissionError] = useState<
    boolean
  >(false);
  const [ingredientSubmissionError, setIngredientSubmissionError] = useState<
    boolean
  >(false);

  return (
    <AppContext.Provider value={{ ...userInfo, cookie }}>
      <Skeleton pathname={pathname}>
        <div className="w-full main py-6 container mx-auto px-4 md:px-0">
          <h1 className="mb-2">Add Drink</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <div className="md:col-span-8">
              <h3 className="mb-2">Drink Name</h3>
              <input
                className={`w-full border rounded py-2 px-3 mb-2 ${
                  nameSubmissionError ? 'border-red-400' : ''
                }`}
                id="grid-first-name"
                type="text"
                placeholder="Drink Name"
                value={drinkToAdd.name}
                onChange={(e) => {
                  const name = e.target.value;
                  drinkReducer({
                    type: 'name',
                    data: name,
                  });
                }}
              />
              <h3 className="mb-2">Drink Description</h3>
              <textarea
                name=""
                id=""
                cols={15}
                className={`w-full border rounded py-2 px-3 ${
                  descriptionSubmissionError ? 'border-red-400' : ''
                }`}
                value={drinkToAdd.description}
                onChange={(e) => {
                  const description = e.target.value;
                  drinkReducer({
                    type: 'description',
                    data: description,
                  });
                }}
              ></textarea>
            </div>
            <div className="md:col-span-4">
              <div className="rounded bg-gray-400 px-8 py-4">
                <h2>Drink Image</h2>
                <ImageUploading
                  onChange={(imageList) => {
                    drinkReducer({
                      type: 'image',
                      image: imageList[0],
                    });
                  }}
                  // 2?!?! WTFFFFFF
                  maxNumber={2}
                  multiple={false}
                  maxFileSize={5}
                  acceptType={['jpg', 'gif', 'png', 'jpeg']}
                >
                  {({ imageList, onImageUpload, onImageRemoveAll }) => {
                    return (
                      <div>
                        <div className="bg-white rounded my-3 p-3">
                          <img
                            src={
                              imageList.length
                                ? imageList[0].dataURL
                                : '/default-drink.png'
                            }
                          />
                        </div>
                        <button
                          onClick={onImageUpload}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Upload Image
                        </button>
                        {imageList.length ? (
                          <svg
                            className="bi bi-trash-fill ml-3"
                            width="1.6em"
                            height="1.6em"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{cursor: 'pointer', display: 'inline-block',}}
                            onClick={onImageRemoveAll}
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        ) : null}
                      </div>
                    );
                  }}
                </ImageUploading>
              </div>
            </div>
          </div>
          <div>
            <h2>Ingredients</h2>
            <IngredientList
              ingredientSubmissionError={ingredientSubmissionError}
              changeIngredients={(ingredients) => {
                if (ingredientSubmissionError && ingredients.length > 0) {
                  setIngredientSubmissionError(false);
                }
                drinkReducer({
                  type: 'ingredients',
                  data: ingredients,
                });
              }}
            />
          </div>
          <div className="pt-6">
            <h2>Instructions</h2>
            <Instructions
              drinkReducer={drinkReducer}
              instructionList={drinkToAdd.instructions}
            />
          </div>
          <div>
            <h2 className="mt-3">Drink Tags</h2>
            <Async
              className="w-full"
              instanceId={2} // da fuq
              isMulti={true}
              loadOptions={loadOptions}
              defaultOptions
              styles={{
                option: base => ({
                  ...base,
                  '&:hover': {
                    cursor: 'pointer'
                  }
                })
              }}
              onChange={(selectedTags) => {
                let tagIds;
                if (selectedTags === null) {
                  tagIds = [];
                } else {
                  tagIds = selectedTags.map(tag => tag.value);
                }
                drinkReducer({
                  type: 'tags',
                  data: [...tagIds],
                });
              }}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="my-5 bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => {
                const errors = [
                  [setNameSubmissionError, drinkToAdd.name],
                  [setDescriptionSubmissionError, drinkToAdd.description],
                  [setIngredientSubmissionError, drinkToAdd.ingredients.length],
                ] as const;

                let hasError = false;

                errors.forEach((e) => {
                  const [setErr, condition] = e;
                  if (!condition) {
                    setErr(true);
                    hasError = true;
                  }
                });

                if (hasError) {
                  return;
                }

                const {
                  ingredients,
                  name,
                  description,
                  instructions,
                  image,
                  tags,
                } = drinkToAdd;

                const body = {
                  ingredients,
                  name,
                  description,
                  instructions: instructions.filter((item) => item),
                  image,
                  tags,
                };

                if (image) {
                  body.image = image;
                }

                makeRequest('/drink', {
                  method: 'POST',
                  headers: turnAuthCookieIntoHeader(cookie),
                  type: (image) ? 'formData' : 'application/json',
                  body,
                }).then((resp) => {
                  if (resp.status === 200) {
                    return resp.json();
                  }
                });
              }}
            >
              Add Drink!
            </button>
          </div>
        </div>
      </Skeleton>
    </AppContext.Provider>
  );
}

Index.getInitialProps = async (ctx) => {
  const cookie = cookies(ctx)[COOKIE_NAME];
  const userInfo = getAuthedUserFromJwt(cookie);
  return {
    cookie,
    ...(userInfo ? { userInfo } : {}),
  };
};

export default Index;
