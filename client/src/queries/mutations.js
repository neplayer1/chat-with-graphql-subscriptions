export const ADD_MESSAGE = `
  mutation addMessage($message: String!, $user: String!) {
    addMessage(message: $message, user: $user)
  }
  `;

export const DELETE_MESSAGE = `
  mutation deleteMessage($id: ID!) {
    deleteMessage(id: $id)
  }
  `;