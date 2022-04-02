<?php

namespace App\Http\Controllers;

use App\Models\File;

class GetAllFilesController extends Controller
{
    public function getAll()
    {
        $files = File::all()->toArray();

        return response()->json([
            'success' => true,
            'data' => $files
        ]);
    }
}
