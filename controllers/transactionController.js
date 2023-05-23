const { Transactionhistory, Product, User, Category } = require("../models");

class transactionController {
  static async buyProduct(req, res) {
    try {
      const { product_id, quantity } = req.body;
      const parseQuanity = parseInt(quantity);
      const { id } = req.UserData;
      //   console.log(id);
      const product = await Product.findOne({ where: { id: product_id } });

      const user = await User.findOne({ where: { id: id } });

      const category = await Category.findOne({
        where: { id: product.CategoryId },
      });
      console.log(category);

      if (product && product.stock >= parseQuanity) {
        let sum = parseQuanity * product.price;
        if (user.balance >= sum) {
          const transactionHistory = await Transactionhistory.create({
            quantity,
            total_price: sum,
            ProductId: product_id,
            updatedAt: new Date(),
            createdAt: new Date(),
            UserId: id,
          });

          const response = {
            totalPrice: transactionHistory.total_price,
            quantity: transactionHistory.quantity,
            product_name: product.title,
          };

          await Product.update(
            { stock: product.stock - parseQuanity },
            { where: { id: req.body.product_id } }
          );

          let sold_product_amount =
            parseInt(category.sold_product_amount) + parseQuanity;
          await Category.update(
            { sold_product_amount: sold_product_amount },
            { where: { id: product.CategoryId } }
          );

          let balance = user.balance - sum;
          await User.update({ balance: balance }, { where: { id: id } });

          res.status(201).json({
            message: "You have successfully purchase the product",
            transactionBill: response,
          });
        } else {
          res.status(404).json({ message: "the balance is not sufficient" });
        }
      } else {
        res.status(404).json({ message: "Product stock is null" });
      }
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  }

  static async getTransactionUser(req, res) {
    const { id } = req.UserData;

    try {
      const transactions = await Transactionhistory.findAll({
        where: { UserId: id },
        include: [
          {
            model: Product,
            attributes: ["id", "title", "price", "stock", "CategoryId"],
          },
        ],
      });

      const response = transactions.map((transactions) => {
        return {
          ProductId: transactions.ProductId,
          UserId: transactions.UserId,
          quantity: transactions.quantity,
          total_price: new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(transactions.total_price),
          createdAt: transactions.createdAt.toISOString().split("T")[0],
          updatedAt: transactions.updatedAt.toISOString().split("T")[0],
          product: {
            id: transactions.Product.id,
            title: transactions.Product.title,
            price: new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(transactions.Product.price),
            stock: transactions.Product.stock,
            CategoryId: transactions.Product.CategoryId,
          },
        };
      });

      res.status(200).json({ transactionHistories: response });
    } catch (error) {
      console.log(error);
    }
  }

  static async getTransactionAdmin(req, res) {
    try {
      const transactions = await Transactionhistory.findAll({
        include: [
          {
            model: Product,
            attributes: ["id", "title", "price", "stock", "CategoryId"],
          },
          {
            model: User,
            atributes: ["id", "email", "balance", "gender", "role"],
          },
        ],
      });

      const response = transactions.map((transactions) => {
        return {
          ProductId: transactions.ProductId,
          UserId: transactions.UserId,
          quantity: transactions.quantity,
          total_price: new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(transactions.total_price),
          createdAt: transactions.createdAt.toISOString().split("T")[0],
          updatedAt: transactions.updatedAt.toISOString().split("T")[0],
          product: {
            id: transactions.Product.id,
            title: transactions.Product.title,
            price: new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(transactions.Product.price),
            stock: transactions.Product.stock,
            CategoryId: transactions.Product.CategoryId,
          },
          user: {
            id: transactions.User.id,
            email: transactions.User.email,
            balance: new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(transactions.User.balance),
            gender: transactions.User.gender,
            role: transactions.User.role,
          },
        };
      });

      res.status(200).json({ transactionHistories: response });
    } catch (error) {
      console.log(error);
    }
  }

  static async getTransactionsById(req, res) {
    const { transactionId } = req.params;

    try {
      const detailTransactions = await Transactionhistory.findByPk(
        transactionId,
        {
          include: [
            {
              model: Product,
              atributes: ["id", "title", "price", "stock", "CategoryId"],
            },
          ],
        }
      );

      if (detailTransactions) {
        const response = {
          ProductId: detailTransactions.ProductId,
          UserId: detailTransactions.UserId,
          quantity: detailTransactions.quantity,
          total_price: new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(detailTransactions.total_price),
          createdAt: detailTransactions.createdAt.toISOString().split("T")[0],
          updatedAt: detailTransactions.updatedAt.toISOString().split("T")[0],
          product: {
            id: detailTransactions.Product.id,
            title: detailTransactions.Product.title,
            price: new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(detailTransactions.Product.price),
            stock: detailTransactions.Product.stock,
            CategoryId: detailTransactions.Product.CategoryId,
          },
        };
        res.status(200).json(response);
      } else {
        res.status(404).json("data not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = transactionController;
