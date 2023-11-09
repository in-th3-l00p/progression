<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProgressionResource;
use App\Models\Progression;
use App\Policies\ProgressionPolicy;
use Illuminate\Http\Request;

class ProgressionController extends Controller
{
    public function __construct()
    {
//        $this->authorizeResource(
//            Progression::class,
//            ProgressionPolicy::class
//        );
    }

    public function index()
    {
        return ProgressionResource::collection(
            Progression::query()
                ->where("user_id", "=", auth()->user()->id)
                ->latest("created_at")
                ->paginate(5)
        );
    }

    public function store(Request $request)
    {
        return new ProgressionResource(Progression::create([
            ...$request->validate([
                "name" => "required|min:1|max:255|unique:progressions,name",
                "description" => "required|max:1000",
                "target_measurement" => "required|in:days,weeks,months",
                "target" => "required|numeric|min:1"
            ]),
            "user_id" => auth()->user()->id
        ]));
    }

    public function show(Progression $progression)
    {
        return new ProgressionResource($progression);
    }

    public function update(Request $request, Progression $progression)
    {
        return new ProgressionResource($progression->update($request->validate([
                "name" => "required|min:1|max:255|unique:progressions,name",
                "description" => "required|max:1000",
                "target_measurement" => "required|in:days,weeks,months",
                "target" => "required|numeric|min:1"
        ])));
    }

    public function destroy(Progression $progression)
    {
        $progression->delete();
    }
}
