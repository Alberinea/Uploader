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
        $data = json_decode($request->getContent());
        $path = $data->path;
        $file = Storage::disk('google')->readStream($path);
        $image = Image::make($file);
        $image->resize($data->metadata->width, $data->metadata->height);
        // $image = imagecreatefromstring($file);
        // $resizedImage = imagescale($image, $data->metadata->width, $data->metadata->height);

        // ob_start();
        // imagejpeg($resizedImage);
        // $resizedImageString = ob_get_contents();
        // ob_end_clean();

        // Storage::disk('google')->update($path, $image);

        DB::table('files')->where('path_id', '=', $path)->update(['metadata' => json_encode($data->metadata)]);

        return response()->json([
            'success' => true,
            'data' => $image
        ]);
    }
}
