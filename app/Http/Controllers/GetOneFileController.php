<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;

class GetOneFileController extends Controller
{
    public function getOne($name)
    {
        $file = File::where('name', '=', $name)->first();
        return response()->json([
            'success' => true,
            'data' => $file
        ]);
    }

    public function resize(Request $request) {
        ini_set('memory_limit','256M');

        $data = json_decode($request->getContent());
        $path = $data->path_id;
        $file = Storage::disk('google')->get($path);
        $image = Image::make($file);
        $image->resize($data->metadata->width, $data->metadata->height);
        $image->encode();

        Storage::disk('google')->update($path, $image, [
            'mimetype' => $data->file_type,
        ]);

        DB::table('files')->where('path_id', '=', $path)->update(['metadata' => json_encode($data->metadata)]);

        return response()->json([
            'success' => true,
        ]);
    }
}
