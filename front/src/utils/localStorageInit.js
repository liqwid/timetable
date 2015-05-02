import generateId from 'utils/generateId';

const localStorageInit = () => {
	localStorage.clear();
	const Authors = [
		{
			id: generateId(),
			name: 'Sara',
			surname: 'Vieira',
			middleName: '',
			company: 'Self-Imployed',
			country: 'Portugal',
			imgUrl: './img/Sara.jpeg'
		},
		{
			id: generateId(),
			name: 'Alicia',
			surname: 'Liu',
			middleName: '',
			company: 'Self-Imployed',
			country: 'USA',
			imgUrl: './img/Alicia.jpg'
		},
		{
			id: generateId(),
			name: 'Jed',
			surname: 'Smith',
			middleName: '',
			company: 'Self-Imployed',
			country: 'USA',
			imgUrl: './img/Jed.jpeg'
		}
	];

	const Themes = [
		{
			id: generateId(),
			title: 'CSS',
			description: 'CSS will be sooner or later it’s own preprocessor, we have amazing functionalities in CSS that allow us to go further with it than we ever did.'
		},
		{
			id: generateId(),
			title: 'JavaScript',
			description: 'As JavaScript continues to eat everything, it seems like the lifespan of any new JavaScript library ends up at about half of the one it replaced. While each of these tools serve to make our lives easer, the churn from switching sometimes makes it hard to tell progress from fashion. In this talk, Jed talks about how the interfaces of these libraries and frameworks are evolving, and how we can design the interfaces to survive the inevitable front-end Singularity.'
		},
		{
			id: generateId(),
			title: 'JS Frameworks',
			description: 'Lorem ipsum'
		}
	];

	const Lectures = [
		{
			id: generateId(),
			title: 'CSS as a programming language',
			timeslot: 1,
			date: new Date(),
			authorsIds: [
				Authors[0].id
			],
			themesIds: [
				Themes[0].id
			]
		},
		{
			id: generateId(),
			title: 'Slaying the Dragon: Refactoring CSS for Maintainability',
			timeslot: 2,
			date: new Date(),
			authorsIds: [
				Authors[1].id
			],
			themesIds: [
				Themes[0].id
			]
		},
		{
			id: generateId(),
			title: 'API Have A Dream',
			timeslot: 3,
			date: new Date(),
			authorsIds: [
				Authors[2].id
			],
			themesIds: [
				Themes[1].id,
				Themes[2].id
			]
		}
	];

	localStorage.authors = JSON.stringify(Authors);
	localStorage.lectures = JSON.stringify(Lectures);
	localStorage.themes = JSON.stringify(Themes);
};

export {localStorageInit as default};
