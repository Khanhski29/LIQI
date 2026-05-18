<?php

namespace App\Http\Controllers;

use App\Models\Product as ProductModel;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $type = $request->query('type');

        $query = ProductModel::query();

        if ($type === 'stock') {

            $query->where('status', 'available');
        } elseif ($type === 'sold') {

            $query->where('status', 'sold');
        }

        $products = $query->get();

        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_code' => 'required|string|unique:products',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'img' => 'required|string',
            'username_account' => 'required|string',
            'password_account' => 'required|string',
            'status' => 'required|in:available,reserved,sold',
        ]);

        $product = ProductModel::create($validated);

        return response()->json([
            'message' => 'Thêm sản phẩm thành công',
            'data' => $product
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = ProductModel::findOrFail($id);

        return response()->json($product);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $product = ProductModel::findOrFail($id);

        return response()->json([
            'id'               => $product->id,
            'product_code'     => $product->product_code,
            'price'            => $product->price,
            'description'      => $product->description,
            'img'              => $product->img,
            'username_account' => $product->getRawOriginal('username_account'),
            'password_account' => $product->password_account,
            'status'           => $product->status,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = ProductModel::findOrFail($id);

        $validated = $request->validate([
            'product_code'     => 'sometimes|string|unique:products,product_code,' . $id,
            'price'            => 'sometimes|numeric',
            'description'      => 'sometimes|string',
            'img'              => 'sometimes|string',
            'username_account' => 'sometimes|string',
            'password_account' => 'sometimes|string',
            'status'           => 'sometimes|in:available,reserved,sold',
        ]);

        $product->update($validated);

        return response()->json([
            'message' => 'Cập nhật sản phẩm thành công',
            'data'    => $product
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
