const BaseRepo = require('../services/BaseRepository');
const { UserModel } = require('../models');
const {validationResult} = require('express-validator');

const sendEmail = require('../mailer/mailerFile');


module.exports.addUserWithoutRagister = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const {divice_id, divice_type, divice_token,is_ragistered} = req.body;
    
    const isdiviceIdExist = await UserModel.findOne({ where: { divice_id }});
    
    if(isdiviceIdExist){
        return res.status(400).json({error: 'Divice ID already exists'});
    }

    try
    {
    const user = await UserModel.create({
        divice_id:divice_id,
        divice_type:divice_type,
        divice_token:divice_token,
        is_ragistered:is_ragistered,
    });
    res.status(201).json(user);
}
    catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.sendOTP = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const {phone, email, otp} = req.body;
    
    try{
    const isPhoneExist = await UserModel.findOne({ where: { phone }});
    if(isPhoneExist){
        return res.status(400).json({error: 'Phone number already exists'});
    }

    const isEmailExist = await UserModel.findOne({ where: { email }});
    if(isEmailExist){
        return res.status(400).json({error: 'Email ID already exists'});
    }

        // write send otp code here on email Id
    sendEmail(otp,1,email);
    res.status(201).json({message: 'OTP sent successfully to your email'});
}
    catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.sendOTPForgetPassword = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const {phone, email, otp} = req.body;
    
    try{

    const isEmailExist = await UserModel.findOne({ where: { email }});
    if(isEmailExist){
     sendEmail(otp,1,email);
     res.status(201).json({message: 'OTP sent successfully to your email'});
    }

    // write send otp code here on email Id
    res.status(201).json({message: 'Invalid Email ID'});
}
    catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal server error'});
    }
}





module.exports.ragisterUser = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const {name,phone,email,location_id,location_name,region,address,password, divice_id, divice_type, divice_token,is_ragistered} = req.body;

    const hashedPassword = await UserModel.hashPassword(password.toString());

    //Check if user already exists by divice_id or not 
    const isdiviceIdExist = await UserModel.findOne({ where: { divice_id }});
    if(isdiviceIdExist){
        // return res.status(400).json({error: 'Divice ID already exists'});
            const user = await BaseRepo.baseUpdate(UserModel, {divice_id}, {name,phone,email,location_id,location_name,region,address,password:hashedPassword,is_ragistered});
            if(!user){
                return res.status(400).json({error: 'User Not Ragistered'});
            }
            const viewUserDetails = await UserModel.findOne({ where: { divice_id }});
            const token = await viewUserDetails.generateAuthToken(); // ✅ instance method
            res.status(201).json({
                message: 'User Ragistered successfully',
                data: viewUserDetails,
                token: token
            });
    }

    // if user not exists then create new user
   
    try{
    const user = await UserModel.create({
        name:name,
        phone:phone,
        email:email,
        location_id:location_id,
        location_name:location_name,
        region:region,
        address:address,
        password:hashedPassword,
        divice_id:divice_id,
        divice_type:divice_type,
        divice_token:divice_token,
        is_ragistered:is_ragistered,
    });

    if(!user){
        return res.status(400).json({error: 'User Not Ragistered'});
    }
    
    const token = await user.generateAuthToken(); // ✅ instance method
    res.status(201).json({
        message: 'User Ragistered successfully',
        data: user,
        token: token
    });
}
    catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal server error'});
    }
}



module.exports.loginUser = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { email, password ,divice_id,divice_type,divice_token } = req.body;

    const user = await UserModel.findOne({ where: {email}, attributes: ['id', 'email', 'password', 'name','location_id','location_name','address'],});
    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password 1' });
    }
    
    console.log("user 1",user);

    const isMatch = await user.comparePassword(password); 
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password 2' });
    }

    console.log("user id ",user.dataValues.id);
    const id = user.dataValues.id;
    const token = await user.generateAuthToken(); // ✅ instance method

    await BaseRepo.baseUpdate(UserModel, {id}, {divice_id,divice_type,divice_token});

    res.status(200).json({ user, token });
};


module.exports.getProfile = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const id = req.params.id;

    const user = await UserModel.findOne({ where: {id}, attributes: ['id', 'email', 'name', 'phone', 'location', 'address'],});
    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }
    res.status(200).json({ user});
};



module.exports.getAllUserProfile = async (req, res, next) => {
   
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;


    const params = {
      searchParams: {is_ragistered:1},
      limit: limit,
      offset: offset,
      page: page,
      order:[["id","DESC"]],
    }

     try {
        const user = await BaseRepo.baseList(UserModel, params);
        if(!user){
            return res.status(400).json({error: 'Error fetching Users'});
        }
        res.status(201).json(user);
        } 
        catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
        }
};


module.exports.updateProfile = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;
    const id = req.params.id;

    const user = await BaseRepo.baseUpdate(UserModel, {id}, payload);
    if(!user){
        return res.status(400).json({error: 'Error Updating User Profile'});
    }
    res.status(201).json({
        message: 'updated user profile successfully',
        data: user
    });
}

module.exports.forgetPassword = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const password = req.body.password;
    const email = req.params.email;

    console.log("password",password.toString());
    const hashedPassword = await UserModel.hashPassword(password.toString());

    console.log("hashedPassword",hashedPassword);
    const user = await BaseRepo.baseUpdate(UserModel, {email}, { password:hashedPassword });
    if(!user){
        return res.status(400).json({error: 'Error Updating User Password'});
    }
    res.status(201).json({
        message: 'updated user Password successfully',
        data: user
    });
}


module.exports.logout = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({error: 'Unauthorized'});
    }
    await AdminModel.update(
        { token: '' },   
        { where: { token: token }}  
    );
    res.status(200).json({message: 'Logout successfully'});
}