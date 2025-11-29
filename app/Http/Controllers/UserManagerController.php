<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserManagerController extends Controller
{
    public function __construct()
    {
        Gate::authorize('manage-user');
    }

    public function index()
    {
        return Inertia::render('UserManager/ListUser', [
            'users' => User::whereNot('role', 'guru')->get()->toArray(),
        ]);
    }

    public function create()
    {
        return Inertia::render('UserManager/AddUser');
    }

    public function store(Request $request)
    {
        $userData = $request->all();
        $userData['password'] = Hash::make($userData['password']);
        User::create($userData);

        $request->session()->flash('success', 'Berhasil menambah data pengguna.');

        return to_route('user.index');
    }

    public function edit(User $user)
    {
        return Inertia::render('UserManager/EditUser', [
            'user' => $user->only([
                'id',
                'name',
                'email',
                'role',
                'created_at',
                'updated_at',
            ]),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $userData = $request->all();
        $userData['password'] = Hash::make($userData['password']);
        $user->update($userData);

        $request->session()->flash('success', 'Berhasil mengubah data pengguna.');

        return to_route('user.index');
    }

    public function destroy(Request $request, User $user)
    {
        $user->delete();

        $request->session()->flash('success', 'Berhasil menghapus data pengguna.');

        return to_route('user.index');
    }
}
