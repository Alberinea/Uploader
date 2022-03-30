<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function upload(Request $request) {

        try {
            $request->validate([    
            'file' => 'required|mimes:csv,jpeg,bmp,png,svg,pdf|max:5000'
        ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json($e->errors(), 400);
        }
        
        $fileModel = new File;
        $fileName = now()->timestamp.'-'.pathinfo($request->file->getClientOriginalName(), PATHINFO_FILENAME);
        
        Storage::disk('google')->put($fileName, file_get_contents($request->file));
        $metadata = Storage::disk('google')->getMetaData($fileName);
        
        $fileModel->name = $fileName;
        $fileModel->path_id = $metadata['path'];
        $fileModel->file_type = $metadata['mimetype'];
        $fileModel->save();

        return response()->json(['success' => true, 'file' => $fileModel]);
    }
}
