import { commentCounter, getComment } from './comment_api_functions.js';

const generateInfo = (data) => {
  const details = document.createElement('div');
  details.classList.add('details');

  const leftDetail = document.createElement('div');
  const countryData = document.createElement('div');
  const countryTitle = document.createElement('span');
  const country = document.createElement('span');
  const categoryData = document.createElement('div');
  const categoryTitle = document.createElement('span');
  const category = document.createElement('span');
  country.classList.add('country');
  country.innerHTML = data.strArea;
  countryTitle.classList.add('sub-title');
  countryTitle.innerHTML = 'Country: ';
  countryData.classList.add('country-data', 'data');
  countryData.appendChild(countryTitle);
  countryData.appendChild(country);
  category.classList.add('category');
  category.innerHTML = data.strCategory;
  categoryTitle.classList.add('sub-title');
  categoryTitle.innerHTML = 'Category: ';
  categoryData.classList.add('category-data', 'data');
  categoryData.appendChild(categoryTitle);
  categoryData.appendChild(category);
  leftDetail.classList.add('left', 'flex-column');
  leftDetail.appendChild(countryData);
  leftDetail.appendChild(categoryData);

  const rightDetail = document.createElement('div');
  const tagTitle = document.createElement('span');
  const tags = document.createElement('ul');
  tagTitle.classList.add('sub-title', 'tag-title');
  tagTitle.innerHTML = 'Meal Tags';
  tags.classList.add('tags');
  if (data.strTags === null) {
    const tagList = document.createElement('li');
    tagList.innerHTML = 'No tags';
    tags.appendChild(tagList);
  } else {
    const tagArray = data.strTags.split(',');
    tagArray.forEach((tag) => {
      const tagList = document.createElement('li');
      tagList.innerHTML = tag;
      tags.appendChild(tagList);
    });
  }
  rightDetail.classList.add('right', 'flex-column');
  rightDetail.appendChild(tagTitle);
  rightDetail.appendChild(tags);

  details.appendChild(leftDetail);
  details.appendChild(rightDetail);

  return details;
};

const generateComments = (mealId) => {
  const comments = document.createElement('div');
  comments.classList.add('comments', 'flex-column');
  const commentTitle = document.createElement('h2');
  commentTitle.classList.add('sub-title', 'meal-title', 'comment-title');
  getComment(mealId)
    .then((response) => {
      const commentNumber = commentCounter(response);
      commentTitle.innerHTML = `Comments [${commentNumber}]`;
      comments.appendChild(commentTitle);
    });
  return comments;
};

const generateForm = () => {
  const form = document.createElement('form');
  const formTitle = document.createElement('h2');
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  const div3 = document.createElement('div');
  const input = document.createElement('input');
  const textarea = document.createElement('textarea');
  const button = document.createElement('button');
  const responseMessage = document.createElement('span');

  formTitle.classList.add('add-comment-title');
  formTitle.innerText = 'Add Comment';

  input.classList.add('user-name', 'input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Your name');
  div1.appendChild(input);

  textarea.classList.add('insight', 'input');
  textarea.setAttribute('placeholder', 'Your insight');
  textarea.setAttribute('maxlength', '100');
  div2.appendChild(textarea);

  button.classList.add('comment-btn');
  button.setAttribute('type', 'button');
  button.innerText = 'Comment';
  responseMessage.classList.add('response-message', 'hide');
  div3.classList.add('submit-box');
  div3.appendChild(button);

  form.classList.add('flex-column');
  form.id = 'add-comment';
  form.appendChild(formTitle);
  form.appendChild(div1);
  form.appendChild(div2);
  form.appendChild(div3);
  form.appendChild(responseMessage);

  return form;
};

export const displayComments = (mealId) => {
  const commentBox = document.querySelector('.comments');
  document.querySelectorAll('.comment-card').forEach((comment) => {
    commentBox.removeChild(comment);
  });
  getComment(mealId)
    .then((response) => {
      const commentNumber = commentCounter(response);
      const commentTitle = document.querySelector('.comment-title');
      commentTitle.innerHTML = `Comments [${commentNumber}]`;
      response.forEach((commentItem) => {
        const commentCard = document.createElement('div');
        commentCard.classList.add('comment-card', 'flex-column');
        const commentHeader = document.createElement('div');
        const date = document.createElement('span');
        const name = document.createElement('span');
        const message = document.createElement('div');

        date.classList.add('date');
        date.textContent = commentItem.creation_date;

        name.classList.add('name');
        name.textContent = ` | By ${commentItem.username}`;

        commentHeader.classList.add('comment-header');
        commentHeader.appendChild(date);
        commentHeader.appendChild(name);

        message.classList.add('message');
        message.textContent = commentItem.comment;

        commentCard.appendChild(commentHeader);
        commentCard.appendChild(message);

        commentBox.appendChild(commentCard);
      });
    })
    .catch(() => {
      const commentCard = document.createElement('div');
      commentCard.classList.add('comment-card', 'green');
      commentCard.innerHTML = 'Be the first to make a comment';
      commentBox.appendChild(commentCard);
    });
};

const generateDetails = (data) => {
  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('detail-container');
  const mealTitle = document.createElement('h2');
  const detailWrapper = document.createElement('div');
  mealTitle.classList.add('meal-title');
  mealTitle.innerHTML = data.strMeal;

  detailWrapper.classList.add('detail-wrapper');
  const content1 = generateInfo(data);
  detailWrapper.appendChild(content1);
  detailWrapper.appendChild(generateComments(data.idMeal));
  detailWrapper.appendChild(generateForm());

  detailsContainer.appendChild(mealTitle);
  detailsContainer.appendChild(detailWrapper);

  return detailsContainer;
};

export const createCommentPop = (id, data) => {
  let mealData;
  data.forEach((meal) => {
    if (meal.idMeal === id) {
      mealData = meal;
    }
  });
  const modalContainer = document.createElement('dialog');
  const modalContent = document.createElement('div');
  const close = document.createElement('button');
  const screenReader = document.createElement('span');
  const imageContainer = document.createElement('div');
  const image = document.createElement('img');
  const link = document.createElement('a');

  screenReader.classList.add('sr-only');
  screenReader.innerText = 'Close';
  close.classList.add('close');
  close.setAttribute('aria-label', 'Close');
  close.appendChild(screenReader);

  image.classList.add('screen-image');
  image.setAttribute('alt', 'Meal Image');
  image.src = mealData.strMealThumb;
  link.src = mealData.strYoutube;
  link.appendChild(image);
  imageContainer.classList.add('image-container');
  imageContainer.appendChild(link);

  const detailsContainer = generateDetails(mealData);

  modalContent.classList.add('modal-content');
  modalContent.id = id;
  modalContent.appendChild(close);
  modalContent.appendChild(imageContainer);
  modalContent.appendChild(detailsContainer);

  modalContainer.classList.add('modal-container');
  modalContainer.classList.add('flex-column');
  modalContainer.appendChild(modalContent);

  return modalContainer;
};