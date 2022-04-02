<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DeleteFileController extends Controller
{
    public function delete (Request $request) { 
        $data = json_decode($request->getContent());
        $path = $data->path_id;
        DB::table('files')->where('path_id', '=', $path)->delete();

        Storage::disk('google')->delete($path);

        return response()->json(['success' => true]);
    }  
}
