import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Category } from '../model/category';
import { HttpClient } from '@angular/common/http'
import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComponentsUtilsService } from './components-utils.service';
import { Product } from '../model/product';
import { DetailList } from '../model/detailList';
import { List } from '../model/list';
import { CategoryCountProducts } from '../model/categoryCountProduct';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private storage: SQLiteObject;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  categoriesList = new BehaviorSubject([]);
  categoriesCountProduct = new BehaviorSubject([]);

  changeInCategories = new BehaviorSubject(null);
  changeInCategories$ = this.changeInCategories.asObservable();

  productsSearchList = new BehaviorSubject([]);

  listDetailList = new BehaviorSubject([]);
  lists = new BehaviorSubject([]);

  changeInList = new BehaviorSubject(null);
  changeInList$ = this.changeInList.asObservable();
  constructor(private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
    private componentsUtilsService: ComponentsUtilsService) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.openBd().then(() => {
          this.createTable(false);
        });
      }
    })
  }

  private openBd() {
    return this.sqlite.create({
      name: 'list_db.db',
      location: 'default',
    })
      .then((db: SQLiteObject) => {
        this.storage = db;
      });
  }

  private createTable(deleteDb: boolean) {
    if (deleteDb) {
      this.sqlite.deleteDatabase({ name: 'list_db.db', location: 'default' }).then(() => { })
    } else {
      this.httpClient.get('assets/seed.sql', { responseType: 'text' })
        .subscribe(data => {
          this.sqlPorter.importSqlToDb(this.storage, data)
            .then((_) => {
              this.isDbReady.next(true);
            })
            .catch((error) => {
              console.error(error)
            })
        });
    }

  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  //Categorias methods
  loadCategories() {
    return this.storage.executeSql('SELECT * from categoria', [])
      .then((res) => {
        let items: Category[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              id_categoria: res.rows.item(i).id_categoria,
              nameCat: res.rows.item(i).nameCat
            });
          }
        }
        this.categoriesList.next(items);
      })
      .catch(async (e) => {
        await this.componentsUtilsService.presentToast1('Ocurrió un error al cargar las categorias.')
      })
  }
  getCategories(): Observable<Category[]> {
    return this.categoriesList.asObservable();
  }

  loadCategoriesWithCountProduct() {
    return this.storage.executeSql('select cat.nameCat,cat.id_categoria, Count(prod.categoria_id) as countProducts from categoria cat left join products prod on prod.categoria_id = cat.id_categoria group by cat.nameCat,cat.id_categoria', [])
      .then((res) => {
        let items: CategoryCountProducts[] = [];

        if (res.rows.length > 0) {
          for (let index = 0; index < res.rows.length; index++) {
            items.push({
              id_categoria: res.rows.item(index).id_categoria,
              nameCat: res.rows.item(index).nameCat,
              countProducts: res.rows.item(index).countProducts,
            });
          }
        }

        this.categoriesCountProduct.next(items);
      }).catch((e) => {
        this.componentsUtilsService.presentToast1('Ocurrió un error al cargar las categorías.')
      })
  }

  getCategoriesWithCount(): Observable<CategoryCountProducts[]> {
    return this.categoriesCountProduct.asObservable();
  }

  async addCategory(name: string) {
    let data = [name.trim()];
    try {
      const res = await this.storage.executeSql('INSERT INTO categoria (nameCat) VALUES (?)', data)
      if (res['rowsAffected'] > 0) {
        await this.componentsUtilsService.presentToast1('Categoría registrada con exito.');
        const cat: CategoryCountProducts = { id_categoria: res['insertId'], nameCat: name.trim(), countProducts: 0 }
        return cat
      } else {
        await this.componentsUtilsService.presentToast1('No se pudo registrar la categoría.')
      }
      return { id_categoria: 1, nameCat: 'Hola' };

    } catch (e) {
      await this.componentsUtilsService.presentToast1('Ocurrió un error al registrar la categoría.');
      return null
    }

  }

  //Product Methods

  addProduct(products: Array<any>) {
    var error = false;
    products.forEach(async (element, index, array) => {
      const data = [element.name.trim(), element.precio, element.cat];
      this.storage.executeSql('INSERT INTO products (name,precio,categoria_id) VALUES(?,?,?)', data)
        .then(async (res) => {

        })
        .catch(async (e) => {
          error = true;
          // await this.componentsUtilsService.presentToast1('Ocurrió un error al registrar el producto.')
        });

      if (index == array.length - 1) {
        if (error) {
          await this.componentsUtilsService.presentToast1('Algunos productos no pudieron registrarse.');
        }
        else {
          await this.componentsUtilsService.presentToast1('Producto(s) registrado(s) con exito.');
        }
      }
    });
  }

  getProductsFound() {
    return this.productsSearchList.asObservable();
  }

  findProductByName(name: string) {
    return this.storage.executeSql('SELECT * FROM products WHERE name LIKE ?', [`${name.trim()}%`]).then(res => {
      let items: Product[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_product: res.rows.item(i).id_product,
            name: res.rows.item(i).name,
            precio: res.rows.item(i).precio,
            categoria_id: res.rows.item(i).categoria_id
          });
        }
      }

      this.productsSearchList.next(items);
    });
  }

  //List Methods

  addList(name: string, date: string, products: Array<Product[]>) {
    var error = false;
    return this.storage.executeSql('INSERT INTO list (nameList,date,state) VALUES (?,?,?)', [name.trim(), date.trim(), 1])
      .then((res) => {
        const idList = res.insertId;
        Promise.all(
          products.map(async (prod, index, array) => {

            const data = [prod['id_product'], idList, prod['cantidad']]
            await this.storage.executeSql('INSERT INTO detail_list (products_id,list_id,cantidad) VALUES (?,?,?)', data).catch(e => {
              error = true;
            });

            if (index == array.length - 1) {
              if (error) {
                await this.componentsUtilsService.presentToast1('Algunos productos no pudieron agregarse en la lista.');
              }
              else {
                await this.componentsUtilsService.presentToast1('Lista registrada con exito.');
              }
            }

          })
        )
      }).catch(e => {
        this.componentsUtilsService.presentToast1('Ocurrió un error al guardar la lista.')
      })
  }

  loadLists() {
    return this.storage.executeSql('SELECT * FROM list', [])
      .then((res) => {
        let items: List[] = [];
        if (res.rows.length > 0) {
          for (let index = 0; index < res.rows.length; index++) {
            items.push({
              id_list: res.rows.item(index).id_list,
              nameList: res.rows.item(index).nameList,
              date: res.rows.item(index).date,
              state: res.rows.item(index).state
            });
          }
        }
        this.lists.next(items);
      })
  }

  getLists() {
    return this.lists.asObservable();
  }

  async deleteList(idList: number) {
    if (await this.componentsUtilsService.presentAlert1('Info', '¿Desea eliminar la lista?')) {
      try {
        await this.componentsUtilsService.presentLoading1();
        await this.storage.executeSql('DELETE FROM list WHERE id_list = ?', [idList]);
        await this.componentsUtilsService.dismissLoading1();
        return true;
      } catch (e) {
        await this.componentsUtilsService.presentToast1('Ocurrió un error al eliminar la lista.')
        await this.componentsUtilsService.dismissLoading1();
        return false;
      }
    } else {
      return false;
    }

  }

  async updateList(idList: number, state: number) {
    if (!(state > 0 && state <= 3)) {
      return;
    }
    const stateName = state == 1 ? 'Pendiente' : state == 2 ? 'Pedido' : 'Recibido';
    if (await this.componentsUtilsService.presentAlert1('Info.', `¿Actualizar a ${stateName}?`)) {
      try {
        await this.componentsUtilsService.presentLoading1();
        const res = await this.storage.executeSql('UPDATE list SET state = ? WHERE id_list =?', [state, idList]);

        if (res['rowsAffected'] > 0) {
          return true;
        } else {
          await this.componentsUtilsService.presentToast1('No se ha podido actualizar el estado de la lista.')
        }
      } catch (e) {
        await this.componentsUtilsService.presentToast1('Ocurrió un error al actualizar la lista.')
        await this.componentsUtilsService.dismissLoading1();
      }
    }
  }

  // DetailList methods
  loadDetailLists(idList: string) {
    return this.storage.executeSql('SELECT l.id_list,dl.id_detail_list,dl.products_id,l.nameList,l.date,l.state,prod.name, prod.precio,dl.cantidad from list l INNER JOIN detail_list dl ON l.id_list = dl.list_id INNER JOIN products prod on dl.products_id = prod.id_product WHERE l.id_List = ?', [idList])
      .then((res) => {
        let items: DetailList[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              id_list: res.rows.item(i).id_list,
              id_detail_list: res.rows.item(i).id_detail_list,
              products_id: res.rows.item(i).products_id,
              nameList: res.rows.item(i).nameList,
              date: res.rows.item(i).date,
              name: res.rows.item(i).name,
              precio: res.rows.item(i).precio,
              cantidad: res.rows.item(i).cantidad,
              state: res.rows.item(i).state
            });
          }
        }
        this.listDetailList.next(items);
      })

  }

  getDetailLists() {
    return this.listDetailList.asObservable();
  }

  async deleteProductsFromDetailList(ids_detail_list: any[]) {
    await this.componentsUtilsService.presentLoading1();
    var error = false;
    var productError = [];
    await Promise.all(
      ids_detail_list.map(async (item) => {
        await this.storage.executeSql('DELETE FROM detail_list WHERE id_detail_list = ?', [item])
          .catch(e => {
            productError.push(item)
            error = true;
          });
      })
    );

    await this.componentsUtilsService.dismissLoading1();
    await this.componentsUtilsService.presentToast1(
      error ? 'Algunos productos no pudieron ser eliminados.' :
        'Productos eliminados.'
    );

    return productError;
  }

  async updateCantidadDetailList(idDetailList: number, cantidad: number) {
    await this.componentsUtilsService.presentLoading1();

    try {
      const res = await this.storage.executeSql('UPDATE detail_list set cantidad=? WHERE id_detail_list =?', [cantidad, idDetailList])
      await this.componentsUtilsService.dismissLoading1();
      if (res['rowsAffected'] > 0) {
        return true;
      } else {
        await this.componentsUtilsService.presentToast1('No se ha podido actualizar el estado de la lista.')
      }

    } catch (e) {
      await this.componentsUtilsService.dismissLoading1();
      await this.componentsUtilsService.presentToast1('Ocurrió un error al actualizar la cantidad')
    }
  }

}
