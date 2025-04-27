<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
})->name('home');
Route::get('/admin/orders', function () {
    return view('orders');
})->name('Orders');

Route::get('/admin/products', function () {
    return view('products');
})->name('Products');

Route::get('/admin/settings', function () {
    return view('settings');
})->name('Settings');
Route::get('/admin', function () {
    return view('admin');
})->name('Admin');
Route::get('/admin/calendar', function () {
    return view('calendar');
})->name('Calendar');
Route::get('/admin/customers', function () {
    return view('customers');
})->name('Customers');

Route::get('/customers', function () {
    return view('customer.index');
})->name('cusHome');

Route::get('/customer/product', function () {
    return view('customer.products');
})->name('cusProducts');

Route::get('/customers/cart', function () {
    return view('customer.cart');
})->name('cusCart');

Route::get('/register', function () {
    return view('login-signup');
})->name('LoginSignup');

Route::post('/signup', [UserController::class,'addUser'])->name('signup');
Route::get('/signup', function(){
    return view('login-signup');
})->name('signup');
Route::post('/login', [UserController::class,'checkLogin'])->name('login');

Route::get('/voices', function(){
    return view('voice-notes');
})->name('Voice');