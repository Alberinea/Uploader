<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DeleteFileController extends Controller
{
    public function delete (Request $request) { 
        $file = $request->json()->get('file');
        DB::table('files')->where('name', '=', $file['name'])->delete();

        Storage::disk('google')->delete($file['path_id']);

        return response()->json(['success' => true]);
    }   
}
