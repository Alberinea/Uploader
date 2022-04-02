<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function upload(Request $request) {
        ini_set('memory_limit','256M');

        // try {
        //     $request->validate([    
        //     'file' => 'required|mimes:csv,jpeg,bmp,png,svg,pdf|max:5000'
        // ]);
        // } catch (\Illuminate\Validation\ValidationException $e) {
        //     return response()->json($e->errors(), 401);
        // }

        $fileModel = new File;
        $fileName = uniqid().'-'.pathinfo($request->file->getClientOriginalName(), PATHINFO_FILENAME);
        
        Storage::disk('google')->put($fileName, file_get_contents($request->file));
        $metadata = Storage::disk('google')->getMetaData($fileName);

        $fileModel->name = $fileName;
        $fileModel->path_id = $metadata['path'];
        $fileModel->file_type = $metadata['mimetype'];

        try {
            $request->validate([    
            'file' => 'mimes:jpeg,bmp,png,svg'
            ]);
            $width = getimagesize($request->file('file'))[0];
            $height = getimagesize($request->file('file'))[1];
            $dimensions = json_encode(['width' => $width, 'height' => $height]);
            $fileModel->metadata = $dimensions;
            $fileModel->isImage = true;
        } catch (\Illuminate\Validation\ValidationException $e) {
            $fileModel->isImage = false;
        }

        $fileModel->save();

        return response()->json(['success' => true, 'file' => $fileModel]);
    }
}
