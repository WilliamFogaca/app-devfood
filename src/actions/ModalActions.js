
export const ShowModal = (btn, text, isBackLink) => ({
  type: 'SHOW_MODAL',
  payload: { btn, text, isBackLink }
});

export const HideModal = () => ({
  type: 'HIDE_MODAL'
});
