const comment = {
  view: {
    success: {
      comment: {
        comments: {
          comment_body: 'Because it has attracted low-quality or spam answers that had to be removed, posting an answer now requires 10 reputation on this site',
          created_at: '2019-07-20T10:48:34.644920Z',
          updated_at: '2019-07-20T22:29:57.144329Z',
          author: {
            username: 'ManuelDominic',
            first_name: 'Space',
            last_name: 'Sprinters',
            created_at: '2019-07-11T19:08:03.617734Z',
            bio: 'A great software developer at Andela Uganda, supper author of 26 books of programming and preacher of the gospel.',
            following: false,
            date_of_birth: '2019-07-24',
            image: 'url',
          },
          id: 1,
          article: 1,
          replies: [],
          comment_on_text: null,
          comment_on_start: null,
          comment_on_end: null,
          user_like_status: null,
          likes_count: null,
        },
      },
    },
    failure: { comment: { detail: 'Invalid authentication. Could not decode token.' } },
  },
  edit: {
    success: {
      comment: {
        comment_body: 'Thank you for your interest in this question. Because it has attracted low-quality or spam answers that had to be removed, posting an answer now requires 10 reputation on this site',
        created_at: '2019-07-20T10:48:34.644920Z',
        updated_at: '2019-07-20T19:02:14.830086Z',
        author: {
          username: 'ManuelDominic',
          first_name: 'Space',
          last_name: 'Sprinters',
          created_at: '2019-07-11T19:08:03.617734Z',
          bio: 'A great software developer at Andela Uganda, supper author of 26 books of programming and preacher of the gospel.',
          following: false,
          date_of_birth: '2019-07-24',
          image: 'url',
        },
        id: 1,
        article: 1,
        replies: [],
        comment_on_text: null,
        comment_on_start: null,
        comment_on_end: null,
        user_like_status: null,
        likes_count: null,
      },
    },
    failure: { comment: { detail: 'You do not have permission to perform this action' } },
  },
  create: {
    success: {
      comment: {
        comment_body: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has',
        created_at: '2019-07-20T19:07:32.235954Z',
        updated_at: '2019-07-20T19:07:32.235976Z',
        author: {
          username: 'ManuelDominic',
          first_name: 'Space',
          last_name: 'Sprinters',
          created_at: '2019-07-11T19:08:03.617734Z',
          bio: 'A great software developer at Andela Uganda, supper author of 26 books of programming and preacher of the gospel.',
          following: false,
          date_of_birth: '2019-07-24',
          image: 'url',
        },
        id: 4,
        article: 1,
        replies: [],
        comment_on_text: null,
        comment_on_start: null,
        comment_on_end: null,
        user_like_status: null,
        likes_count: null,
      },
    },
    failure: { comment: { detail: 'You do not have permission to perform this action' } },
  },
  delete: {
    success: {
      comment: {
        message: 'Successfully deleted comment',
      },
    },
    failure: { comment: { detail: 'You do not have permission to perform this action' } },
  },
};
export default comment;
