
export const ShowModal = (btn, text, isBackLink, recipeId = 0) => ({
  type: 'SHOW_MODAL',
  payload: { btn, text, isBackLink, recipeId }
});

export const HideModal = () => ({
  type: 'HIDE_MODAL'
});
