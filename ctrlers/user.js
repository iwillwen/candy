var model = require('../model'),
	user = model.user,
	duoshuo = require('duoshuo');

// 读取一个用户
exports.read = function(id,cb){
	user.findById(id).populate('thread').exec(function(err,user){
		if (!err) {
			cb(user)
		} else {
			cb('error')
		}
	});
}

// queryById
exports.queryById = function(id,cb){
	user.findById(id).exec(function(err,user){
		if (!err) {
			cb(user)
		} else {
			cb('error')
		}
	});
}

// 读取一个用户by user_id
exports.readByDsId = function(id,cb){
	user.findOne({
		'duoshuo.user_id' : id
	}).exec(function(err,user){
		if (!err) {
			cb(user)
		} else {
			cb('error')
		}
	});
}

// 创建用户
exports.create = function(baby,cb) {
	var baby = new user(baby);
	baby.save(function(err){
		if (!err) {
			cb(baby);
		} else {
			console.log(err)
		}
	})
}

// 同步一个用户到多说
exports.sync = function(uid) {
	
}

// 更新用户
exports.update = function(id,body,cb) {
	user.findByIdAndUpdate(id,body,function(err){
		if (!err) {
			cb(body);
		}
	})
}

// 删除用户
exports.remove = function(id) {
	user.findById(id).exec(function(err,u){
		if (!err) {
			u.remove();
			u.save();
		}
	})
}