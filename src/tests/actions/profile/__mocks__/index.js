const profile = {
  view: {
    success: {
      profile: {
        username: 'cronos',
        first_name: 'Kronos',
        last_name: 'Devs',
        created_at: '2019-07-08T11:32:01.630577Z',
        bio: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
        following: false,
        date_of_birth: '2019-07-17',
        image: 'https://images.pexels.com/photos/2118870/pexels-photo-2118870.jpeg?cs=srgb&amp;amp;dl=adult-attractive-beautiful-2118870.jpg&amp;amp;fm=jpg',
      },
    },
    failure: { profile: { detail: 'Invalid authentication. Could not decode token.' } },
  },
  edit: {
    success: {
      profile: {
        first_name: 'Dominic',
        last_name: 'Manuel',
        bio: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
        image: 'https://images.pexels.com/photos/2118870/pexels-photo-2118870.jpeg?cs=srgb&amp;amp;dl=adult-attractive-beautiful-2118870.jpg&amp;amp;fm=jpg',
        date_of_birth: '2019-07-17',
      },
    },
    failure: { profile: { detail: 'You do not have permission to perform this action' } },
  },
};

export default profile;
