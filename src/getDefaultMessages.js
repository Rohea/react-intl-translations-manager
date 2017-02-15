export default (files, { overrideMessage = 'default' } = {}) => {
  if (!files) throw new Error('Files are required');

  return files.reduce((fileAcc, { descriptors }) => {
    const duplicateIds = fileAcc.duplicateIds;
    return {
      messages: descriptors.reduce((descAcc, { id, defaultMessage }) => {
        if (descAcc[id] !== undefined) {
          duplicateIds.push(id);
        }

        let message;
        switch (overrideMessage) {
          case 'default':
            message = defaultMessage;
            break;
          case 'id':
            message = id;
            break;
          default:
            message = '';
        }

        return { ...descAcc, [id]: message };
      }, fileAcc.messages),
      duplicateIds,
    };
  }, {
    messages: {},
    duplicateIds: [],
  });
};
