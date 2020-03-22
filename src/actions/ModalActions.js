
export const ShowModal = (btn, text, isBackLink, history) => ({
  type: 'SHOW_MODAL',
  payload: { btn, text, isBackLink, history }
});

export const HideModal = () => ({
  type: 'HIDE_MODAL'
});
