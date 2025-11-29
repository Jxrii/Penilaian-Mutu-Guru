<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index()
    {
        Gate::authorize('manage-teacher');

        return Inertia::render('Teacher/ListTeacher', [
            'teachers' => Teacher::all()->toArray(),
        ]);
    }

    public function create()
    {
        Gate::authorize('manage-teacher');

        return Inertia::render('Teacher/AddTeacher');
    }

    public function store(Request $request)
    {
        $teacher = Teacher::create($request->all());

        $userData = [
            'name' => $teacher->name,
            'email' => $teacher->email,
            'password' => Hash::make('12345678'),
            'role' => 'guru',
        ];

        $user = User::create($userData);

        $request->session()->flash('success', 'Berhasil menambah data guru.');

        return to_route('teacher.index');
    }

    public function edit(Teacher $teacher)
    {
        Gate::authorize('manage-teacher');

        return Inertia::render('Teacher/EditTeacher', [
            'teacher' => $teacher->only([
                'id',
                'name',
                'subject',
                'class',
                'email',
                'created_at',
                'updated_at',
            ]),
        ]);
    }

    public function update(Request $request, Teacher $teacher)
    {
        Gate::authorize('manage-teacher');

        $teacher->update($request->all());

        $user = User::where('email', $teacher->email)->first();
        $user->name = $teacher->name;
        $user->email = $teacher->email;
        $user->save();

        $request->session()->flash('success', 'Berhasil mengubah data guru.');

        return to_route('teacher.index');
    }

    public function destroy(Request $request, Teacher $teacher)
    {
        $user = User::where('email', $teacher->email)->first();
        $user->delete();
        $teacher->delete();

        $request->session()->flash('success', 'Berhasil menghapus data guru.');

        return to_route('teacher.index');
    }
}
