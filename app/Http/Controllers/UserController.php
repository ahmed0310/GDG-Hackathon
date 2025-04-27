<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function addUser(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);

        if (User::where('email', $request->email)->exists()) {
            return back()->withInput()->with('error', 'Email already registered.');
        }
        User::create($data);

        return view('login-signup');
    }

    public function checkLogin(Request $request){
        $data = $request->validate(
            [
                'email' => 'required',
                'password' => 'required'
            ]
            );
        if($data['email']== "admin@gmail.com" && $data['password'] == "admin"){
            return view('admin');
        }
        if(Auth::attempt($data)){
            return view('customer.index');
        }
        else{
            return redirect()->back()->with('mess', 'Invalid Credentials.');
        }
    }
}
