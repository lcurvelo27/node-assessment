var userData = require('./userData.json')

module.exports = {
	getUsers: (req, res, next) => {
		let key = Object.keys(req.query)[0]
		
		switch(key){
			case undefined:
				return res.status(200).send(userData)
				
			case 'favorites':				
				let favorites = userData.filter(user => user.favorites.indexOf(req.query.favorites) != -1)
				return res.status(200).send(favorites)

			case 'age':
				let age = userData.filter(user => user.age < req.query.age)
				return res.status(200).send(age)

			case 'lastname':
				let lastname = userData.filter(user => user.last_name === req.query.lastname)
				return res.status(200).send(lastname)

			case 'email':
				let email = userData.filter(user => user.email === req.query.email)
				return res.status(200).send(email)
							

			default: return res.status(200).send(userData)
		}		
	},
	getFavorites: (req, res, next) => {
		console.log(req.query)
		var users = [];
		for(var i = 0; i < userData.length; i++){
			var favortes = userData[i].favorites
			if(favorites.indexOf(req.query.favorite) != -1){
				users.push(userData[i])
			}
		}
		console.log(users)
		return res.status(200).send(users)
	},
	getUserId: (req, res, next) => {
		for(var i = 0; i < userData.length; i++){
			if(userData[i].id === Number(req.params.id)){
				return res.status(200).send(userData[i])
			}
		}
		return res.status(404).json(null)
	},
	getAdmins: (req, res, next) => {
		var admin = []
		for(var i = 0; i < userData.length; i++){
			if(userData[i].type === 'admin'){
				admin.push(userData[i])
			}
		}
		return res.status(200).send(admin)
	},
	getNonadmins: (req, res, next) => {
		var nonadmins = []
		for(var i = 0; i < userData.length; i++){
			if(userData[i].type != 'admin'){
				nonadmins.push(userData[i])
			}
		}
		return res.status(200).send(nonadmins)
	},
	getUserType: (req, res, next) => {
		var userType = req.params.type
		var users = userData.filter(user => user.type === userType)
		return res.status(200).send(users)
	},
	updateUserByID: (req, res, next) => {
		for(var i = 0; i < userData.length; i++){
			if(userData[i].id == Number(req.params.id)){
				userData[i] = req.body
			}
		}
		return res.status(200).send(userData)
	},
	addUser: (req, res, next) => { 
		var user = req.body
		user.id = userData.length + 1
		userData.push(user)
		return res.status(200).send(userData)
	},
	removeUser: (req, res, next) => { 
		for(var i = 0; i < userData.length; i++){
			if(userData[i].id === Number(req.params.id)){
				userData.splice(i, 1)
			}
		}
		return res.status(200).send(userData)
	}
}






















